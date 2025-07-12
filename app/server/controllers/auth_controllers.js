const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/user");
const { hashPassword, comparePasswords } = require("../utils/hash");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return res.status(409).json({ message: "Email already in use" });

    const password_hash = await hashPassword(password);

    const [newUser] = await createUser({ username, email, password_hash });

    res.status(201).json({ user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error during signup", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isValid = await comparePasswords(password, user.password_hash);
    if (!isValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error during login", error: err.message });
  }
};

module.exports = { signup, login };
