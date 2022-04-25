"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileUpload = void 0;
const validateFileUpload = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({ msg: "No hay archivos que subir - validateFileUpload" });
    }
    next();
};
exports.validateFileUpload = validateFileUpload;
