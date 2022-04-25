"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/:id', controllers_1.getUser);
        this.router.get('/', controllers_1.getUsers);
        this.router.post('/', controllers_1.createUser);
        this.router.put('/:id', controllers_1.updateUser);
        this.router.delete('/:id', controllers_1.deleteUser);
    }
}
exports.userRoutes = new UserRoutes().router;
// module.exports = userRoutes.router;
