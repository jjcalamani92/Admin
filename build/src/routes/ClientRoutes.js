"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
class ClientRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        //FIXME: GET CLIENT
        this.router.get('/:id', [
            (0, express_validator_1.check)("id", "No es un id de Mongo valido").isMongoId(),
            (0, express_validator_1.check)("id").custom(helpers_1.existeClientById),
            middlewares_1.validarCampos,
        ], controllers_1.getClient);
        //FIXME: GET CLIENTS
        this.router.get('/', controllers_1.getClients);
        //FIXME: CREATE CLIENT
        this.router.post('/', [
            (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
            (0, express_validator_1.check)('password', 'El password debe de ser de 6 caracteres').isLength({
                min: 6,
            }),
            (0, express_validator_1.check)('email').custom(helpers_1.existeEmail),
            (0, express_validator_1.check)('rol').custom(helpers_1.esRolValido),
            middlewares_1.validarCampos
        ], controllers_1.createClient);
        //FIXME: UPDATE CLIENT
        this.router.put('/:id', [
            (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
            (0, express_validator_1.check)('id').custom(helpers_1.existeClientById),
            (0, express_validator_1.check)('rol').custom(helpers_1.esRolValido),
            middlewares_1.validarCampos
        ], controllers_1.updateClient);
        //FIXME: DELETE CLIENT
        this.router.delete('/:id', [
            middlewares_1.validarJWT,
            // esAdminRol,
            (0, middlewares_1.tieneRol)('ADMIN_ROL', 'VENTAS_ROL', 'CLIENT_ROL'),
            (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
            (0, express_validator_1.check)('id').custom(helpers_1.existeClientById),
            middlewares_1.validarCampos
        ], controllers_1.deleteClient);
    }
}
exports.clientRoutes = new ClientRoutes().router;
// module.exports = userRoutes.router;
