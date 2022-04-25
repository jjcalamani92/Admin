"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
class SearchRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/:collection/:finished', controllers_1.search);
    }
}
exports.searchRoutes = new SearchRoutes().router;
