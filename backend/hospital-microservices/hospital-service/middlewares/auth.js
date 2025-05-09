module.exports = (rolesPermitidos = []) => {
    return (req, res, next) => {
      if (!req.userRole) {
        return res.status(401).json({ error: 'No autorizado' });
      }
  
      if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(req.userRole)) {
        return res.status(403).json({ error: 'No tienes permisos para esta acción' });
      }
  
      next();
    };
  };