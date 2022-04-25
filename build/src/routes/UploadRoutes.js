"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const validar_campos_1 = require("../middlewares/validar-campos");
class UploadRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/', controllers_1.uploadFiles);
        this.router.put('/:collection/:id', [
            middlewares_1.validateFileUpload,
            (0, express_validator_1.check)('id', 'El id debe de ser de mongo').isMongoId(),
            (0, express_validator_1.check)('collection').custom(c => (0, helpers_1.allowedCollections)(c, ['clients', 'wearproducts'])),
            validar_campos_1.validarCampos
        ], controllers_1.updateImageCloudinary);
        this.router.get('/:collection/:id', [
            (0, express_validator_1.check)('id', 'El id debe de ser de mongo').isMongoId(),
            (0, express_validator_1.check)('collection').custom(c => (0, helpers_1.allowedCollections)(c, ['clients', 'wearproducts'])),
            validar_campos_1.validarCampos
        ], controllers_1.getImage);
    }
}
exports.uploadRoutes = new UploadRoutes().router;
