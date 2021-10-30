module.exports = (req, res, next) => {
  const { role } = req.user;

  if (role !== "SUPERADMIN") {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  next();
};
