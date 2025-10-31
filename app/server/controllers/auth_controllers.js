const jwt = require("jsonwebtoken");
const COOKIE_OPTIONS = require("../config/cookieConfig");
const User = require("../models/user_model");

const signup = async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password, goal } = req.body;
    const existingUser = await User.findUserByEmail(email);
    if (existingUser)
      return res.status(409).json({ message: "Email already in use" });

    const newUser = await User.createNewUser({
      username,
      email,
      password,
      goal,
      current_streak: 0,
      longest_streak: 0,
      last_entry_date: null,
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res
      .cookie("token", token, COOKIE_OPTIONS)
      .status(201)
      .json({
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          goal: newUser.goal,
        },
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error during signup", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("serverside receives", req.body);

    const user = await User.findUserByEmail(email);

    console.log("db query finished", user);
    //if no user or the password isn't valid
    if (!user || !(await user.isValidPassword(password))) {
      console.log("no user found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token, COOKIE_OPTIONS).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        goal: user.goal,
      },
    });
  } catch (err) {
    console.error("❌ Database error:", err);
    res
      .status(500)
      .json({ message: "Server error during login", error: err.message });
  }
};

const findMe = async (req, res) => {
  try {
    const user = await User.findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        goal: user.goal,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving current user", error: err.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", COOKIE_OPTIONS);
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error logging out", error: err.message });
  }
};

module.exports = { signup, login, findMe, logout };
