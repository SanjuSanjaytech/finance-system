export const allowRoles = (...roles) => {
  return (req, res, next) => {
    // here req.user comes from auth middleware
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  };
};