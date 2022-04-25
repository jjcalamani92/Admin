"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneRol = exports.esAdminRol = void 0;
const esAdminRol = (req, res, next) => {
    if (!req.client) {
        return res.status(500).json({ msg: 'Se quiere verificar el rol sin validar el token primero' });
    }
    const { rol, name } = req.client;
    if (rol !== 'ADMIN_ROL') {
        return res.status(401).json({ msg: `${name} no es administrado - no puede hacer esto` });
    }
    next();
};
exports.esAdminRol = esAdminRol;
const tieneRol = (...rols) => {
    return (req, res, next) => {
        if (!req.client) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }
        if (!rols.includes(req.client.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${rols}`
            });
        }
        next();
    };
};
exports.tieneRol = tieneRol;
