const knex = require("../db/knex");
const redis = require("../redis/client");
const { DateTime } = require("luxon");

/**
 * Handles inserting a journal entry + updating user streak
 * inside a single atomic transaction.
 */
const createJournalEntryWithStreak = async ({
  user_id,
  title,
  content,
  mood,
  is_shared,
}) => {
  return await knex.transaction(async (trx) => {
    // 1) Insert journal entry
    const [entry] = await trx("journal_entries")
      .insert({
        user_id,
        title,
        content,
        mood,
        is_shared,
      })
      .returning("*");

    // 2) Update user streak inside the same transaction
    await updateUserStreakOnNewEntry(trx, user_id, entry.created_at);

    //clear the cache so that the old streak info is removed
    await redis.del(`streak:${user_id}`);
    //return the entry normally like the we did with the model
    return entry;
  });
};

/**
 * Updates user streak based on the createdAt timestamp of the new entry.
 */
async function updateUserStreakOnNewEntry(trx, userId, createdAtUtc) {
  // Fetch relevant user streak fields
  const user = await trx("users")
    .where({ id: userId })
    .first("current_streak", "longest_streak", "last_entry_date", "timezone");

  const timezone = user.timezone || "America/New_York";

  // Convert entry timestamp to user's local day using luxon's datetime
  //from the universal time, set the timezone to be NY and then make it an ISO date string
  const entryDay = DateTime.fromJSDate(createdAtUtc)
    .setZone(timezone)
    .toISODate(); // e.g. "2025-11-23"

  const lastDay = user.last_entry_date;

  let current = user.current_streak || 0;
  let longest = user.longest_streak || 0;

  // First entry ever? then streak = 1
  if (!lastDay) {
    current = 1;
  } else {
    /*
    .
    i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
    i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
    i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
    i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
    */
    const diffDays = DateTime.fromISO(entryDay)
      .diff(DateTime.fromISO(lastDay), "days")
      .toObject().days;

    if (diffDays === 0) {
      // Already have an entry today → do nothing
      return;
    } else if (diffDays === 1) {
      // Next day → streak goes up
      current += 1;
    } else if (diffDays > 1) {
      // Missed a day → reset streak
      current = 1;
    }
  }

  // Update longest streak
  longest = Math.max(longest, current);

  // Update user record
  await trx("users").where({ id: userId }).update({
    current_streak: current,
    longest_streak: longest,
    last_entry_date: entryDay,
  });
}

module.exports = {
  createJournalEntryWithStreak,
};
