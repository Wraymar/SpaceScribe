const COOKIE_OPTIONS = {
  httpOnly: true,
  //Cookie cannot be accessed via document.cookie in JavaScript (helps prevent XSS attacks).
  secure: process.env.NODE_ENV === "production", // only secure in production

  // 	•	Use lax for most session cookies to avoid breaking cross-site navigation.
  //	Use strict only if you want very strict CSRF protection and don’t mind breaking some external navigation flows.
  sameSite: "lax",
  //maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  path: "/",
};

module.exports = COOKIE_OPTIONS;
