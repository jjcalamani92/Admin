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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWearProduct = exports.updateWearProduct = exports.createWearProduct = exports.getWearProducts = exports.getWearProduct = void 0;
const models_1 = require("../models");
//TODO: GET WEARPRODUCT
const getWearProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const wearproduct = yield models_1.WearProduct.findById(id).populate('client').select('title image client').lean();
    res.json(wearproduct);
});
exports.getWearProduct = getWearProduct;
//TODO: GET WEARPRODUCTS
const getWearProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };
    const [total, wearproducts] = yield Promise.all([
        models_1.WearProduct.countDocuments(query),
        models_1.WearProduct.find(query).populate('client').select('title image client').skip(Number(desde)).limit(Number(limite))
    ]);
    res.json({ total, wearproducts });
});
exports.getWearProducts = getWearProducts;
//TODO: CREATE WEARPRODUCTS  
const createWearProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { status } = _a, body = __rest(_a, ["status"]);
    //Generar la data a guardar
    const data = Object.assign(Object.assign({}, body), { title: req.body.title.toLowerCase(), slug: req.body.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/-/g, '').replace(/\s+/g, '-') });
    const wearproduct = new models_1.WearProduct(data);
    //Guardar en BD
    yield wearproduct.save();
    res.status(201).json(wearproduct);
    // res.json('createWearProduct- controlador')
});
exports.createWearProduct = createWearProduct;
const updateWearProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { status, client } = _b, data = __rest(_b, ["status", "client"]);
    if (data.title) {
        data.title = data.title.toLowerCase();
    }
    data.client = req.client._id;
    const wearproduct = yield models_1.WearProduct.findByIdAndUpdate(id, data, { new: true });
    res.json(wearproduct);
});
exports.updateWearProduct = updateWearProduct;
const deleteWearProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const wearproduct = yield models_1.WearProduct.findByIdAndUpdate(id, { status: false }, { new: true });
    res.json(wearproduct);
});
exports.deleteWearProduct = deleteWearProduct;
//TODO: estructura base
// export const getWearProduct = (req: Request, res: Response) => {
//   res.json({msg: 'getWearProduct- controlador'})
// }
// export const getWearProducts = (req: Request, res: Response) => {
//   res.json({msg: 'getWearProducts- controlador'})
// }
// export const createWearProduct = (req: Request, res: Response) => {
//   res.json('createWearProduct- controlador')
// }
// export const updateWearProduct = (req: Request, res: Response) => {
//   res.json({msg: 'updateWearProduct- controlador'})
// }
// export const deleteWearProduct = (req: Request, res: Response) => {
//   res.json('deleteWearProduct- controlador')
// }
