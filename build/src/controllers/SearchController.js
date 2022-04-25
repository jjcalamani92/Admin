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
exports.search = void 0;
const models_1 = require("../models");
const { ObjectId } = require("mongoose").Types;
const allowedCollections = [
    'clients',
    'paintworkproducts',
    'users',
    'wearproducts'
];
const searchClients = (finished = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoID = ObjectId.isValid(finished);
    if (esMongoID) {
        const client = yield models_1.Client.findById(finished);
        res.json({ results: (client) ? [client] : [] });
    }
    const regex = new RegExp(finished, 'i');
    const clients = yield models_1.Client.find({ $or: [{ name: regex }, { email: regex }], $and: [{ status: true }] });
    res.json({
        results: clients
    });
});
const searchWearProducts = (finished = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoID = ObjectId.isValid(finished);
    if (esMongoID) {
        const wearproduct = yield models_1.WearProduct.findById(finished).populate('client', 'name');
        res.json({
            results: (wearproduct) ? [wearproduct] : []
        });
    }
    const regex = new RegExp(finished, 'i');
    const wearproducts = yield models_1.WearProduct.find({ name: regex, status: true }).populate('client', 'name');
    res.json({
        results: wearproducts
    });
});
const search = (req, res) => {
    const { collection, finished } = req.params;
    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({ msg: `Las colecciones permitidas son: ${allowedCollections}` });
    }
    switch (collection) {
        case 'clients':
            searchClients(finished, res);
            break;
        case 'users':
            // searchCategory( finished, res );
            break;
        case 'wearproducts':
            searchWearProducts(finished, res);
            break;
        case 'paintworkproducts':
            // searchProducts( finished, res );
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta búsqueda'
            });
    }
};
exports.search = search;
