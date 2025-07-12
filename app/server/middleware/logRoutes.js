const logRoutes = (req, res, next) => {
  const time = new Date();
  let formattedTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // This ensures 12-hour format with AM/PM
  });
  const date = `${new Date().toString().slice(0, 15)} at: ${formattedTime}`;
  console.log(`${req.method} ${req.originalUrl} - ${date}`);
  next();
};

module.exports = logRoutes;
