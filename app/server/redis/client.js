const Redis = require("ioredis");

let redis;
//if we have a redis cloud link in the env for production
if (process.env.REDIS_URL) {
  // Production or cloud Redis (Redis Cloud, Upstash, Elasticache)
  redis = new Redis(process.env.REDIS_URL);
} else {
  // Local Redis via Docker
  redis = new Redis({
    host: "localhost",
    port: 6379,
  });
}

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = redis;
