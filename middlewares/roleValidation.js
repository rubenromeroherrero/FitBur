const roleValidation = (role) => {
  const roles = Array.isArray(role) ? role : [role];
  return (req, res, next) => {
    if (![...roles, "admin"].includes(req.user?.role))
      throw new Error("You are not an admin");
    next();
  };
};
module.exports = roleValidation;
