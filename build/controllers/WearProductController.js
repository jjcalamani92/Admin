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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWearProduct = exports.updateWearProduct = exports.createWearProduct = exports.getWearProducts = exports.getWearProduct = void 0;
const models_1 = require("../models");
const getWearProduct = (req, res) => {
    res.json('getWearProduct- controlador');
};
exports.getWearProduct = getWearProduct;
const getWearProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wearproducts = yield models_1.WearProduct.find();
    res.json(wearproducts);
});
exports.getWearProducts = getWearProducts;
const createWearProduct = (req, res) => {
    // const { ...body } = req.body;
    // //Generar la data a guardar
    // const data = {
    //   ...body,
    //   title: req.body.title.toLowerCase(),
    //   slug: req.body.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_')
    // }
    // const product = new WearProduct( data );  
    // //Guardar en BD
    // await product.save();
    // res.status(201).json( product );
    res.json('createWearProduct- controlador');
};
exports.createWearProduct = createWearProduct;
const updateWearProduct = (req, res) => {
    res.json('updateWearProduct- controlador');
};
exports.updateWearProduct = updateWearProduct;
const deleteWearProduct = (req, res) => {
    res.json('deleteWearProduct- controlador');
};
exports.deleteWearProduct = deleteWearProduct;
// getWearProduct(req: Request, res: Response) {
//   res.send('getWearProduct')
// }
// async getWearProducts(req: Request, res: Response) {
//   const wearproducts = await WearProduct.find();
//   res.json(wearproducts);
// }
// async createWearProduct(req: Request, res: Response) {
//   const { ...body } = req.body;
//   //Generar la data a guardar
//   const data = {
//     ...body,
//     title: req.body.title.toLowerCase(),
//     slug: req.body.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_')
//   }
//   const product = new WearProduct( data );  
//   //Guardar en BD
//   await product.save();
//   res.status(201).json( product );
// }
// updateWearProduct(req: Request, res: Response) {
//   res.send('updateWearProduct')
// }
// deleteWearProduct(req: Request, res: Response) {
//   res.send('deleteWearProduct')
// }
