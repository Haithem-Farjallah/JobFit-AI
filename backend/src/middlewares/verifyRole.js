export function verifyRole(roles = []) {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.status(403).json({ message: "you are not allowed" });
    }
    next();
  };
}
