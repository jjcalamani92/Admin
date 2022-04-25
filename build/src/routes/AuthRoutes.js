"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post('/login', [
            (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
            (0, express_validator_1.check)('password', 'El password es obligatorio').not().isEmpty(),
            middlewares_1.validarCampos,
        ], controllers_1.login);
    }
}
exports.authRoutes = new AuthRoutes().router;
// module.exports = userRoutes.router;
