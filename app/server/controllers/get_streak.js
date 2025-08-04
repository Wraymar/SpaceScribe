const User = require("../models/user_model");

const getStreak = async (req, res) => {
  try {
    const user = await User.findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      streak: {
        current: user.current_streak,
        longest: user.longest_streak,
        last_entry_date: user.last_entry_date,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving streak", error: err.message });
  }
};

module.exports = getStreak;
