"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wearProductsRoutes = void 0;
const express_1 = require("express");
const WearProduct_1 = __importDefault(require("../models/WearProduct"));
class WearProductsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getWearProduct(req, res) {
        res.send('getWearProduct');
    }
    getWearProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const wearproducts = yield WearProduct_1.default.find();
            res.json(wearproducts);
        });
    }
    createWearProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = __rest(req.body, []);
            //Generar la data a guardar
            const data = Object.assign(Object.assign({}, body), { title: req.body.title.toLowerCase(), slug: req.body.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_') });
            const product = new WearProduct_1.default(data);
            //Guardar en BD
            yield product.save();
            res.status(201).json(product);
        });
    }
    updateWearProduct(req, res) {
        res.send('updateWearProduct');
    }
    deleteWearProduct(req, res) {
        res.send('deleteWearProduct');
    }
    routes() {
        this.router.get('/:id', this.getWearProduct);
        this.router.get('/', this.getWearProducts);
        this.router.post('/', this.createWearProduct);
        this.router.put('/:id', this.updateWearProduct);
        this.router.delete('/:id', this.deleteWearProduct);
    }
}
exports.wearProductsRoutes = new WearProductsRoutes().router;
// module.exports = wearProductsRoutes.router;
