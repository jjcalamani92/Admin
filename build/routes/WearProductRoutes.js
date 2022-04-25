"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wearProductsRoutes = void 0;
const express_1 = require("express");
const WearProductController_1 = require("../controllers/WearProductController");
class WearProductsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/:id', WearProductController_1.getWearProduct);
        this.router.get('/', WearProductController_1.getWearProducts);
        this.router.post('/', WearProductController_1.createWearProduct);
        this.router.put('/:id', WearProductController_1.updateWearProduct);
        this.router.delete('/:id', WearProductController_1.deleteWearProduct);
    }
}
exports.wearProductsRoutes = new WearProductsRoutes().router;
// module.exports = wearProductsRoutes.router;
