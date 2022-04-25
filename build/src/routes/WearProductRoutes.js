"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wearProductsRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
class WearProductsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        //FIXME: GET WEARPRODUCT
        this.router.get('/:id', [
            (0, express_validator_1.check)("id", "No es un id de Mongo valido").isMongoId(),
            (0, express_validator_1.check)("id").custom(helpers_1.existeWearProductById),
            middlewares_1.validarCampos,
        ], controllers_1.getWearProduct);
        //FIXME: GET WEARPRODUCTS
        this.router.get('/', controllers_1.getWearProducts);
        //FIXME: CREATE WEARPRODUCT
        this.router.post('/', [
            middlewares_1.validarJWT,
            (0, express_validator_1.check)('title', 'El nombre del producto es obligatorio').not().isEmpty(),
            middlewares_1.validarCampos
        ], controllers_1.createWearProduct);
        //FIXME: PUT WEARPRODUCT
        this.router.put('/:id', [
            middlewares_1.validarJWT,
            (0, express_validator_1.check)("id").custom(helpers_1.existeWearProductById),
            middlewares_1.validarCampos
        ], controllers_1.updateWearProduct);
        //FIXME: DELETE WEARPRODUCT
        this.router.delete('/:id', [
            middlewares_1.validarJWT,
            (0, middlewares_1.tieneRol)('ADMIN_ROL', 'CLIENT_ROL'),
            (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
            (0, express_validator_1.check)("id").custom(helpers_1.existeWearProductById),
            middlewares_1.validarCampos
        ], controllers_1.deleteWearProduct);
    }
}
exports.wearProductsRoutes = new WearProductsRoutes().router;
// module.exports = wearProductsRoutes.router;
