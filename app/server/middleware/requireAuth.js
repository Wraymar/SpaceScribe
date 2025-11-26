const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(
      `Middleware detected userid: ${req.user.id}, forwarding to the next controller...`
    );
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = requireAuth;
