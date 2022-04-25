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
exports.allowedCollections = exports.existeWearProductById = exports.existeClientById = exports.existeEmail = exports.esRolValido = void 0;
const models_1 = require("../models");
const esRolValido = (rol = "") => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield models_1.Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no ésta registrado en la BD`);
    }
});
exports.esRolValido = esRolValido;
const existeEmail = (email = "") => __awaiter(void 0, void 0, void 0, function* () {
    const existeEmail = yield models_1.Client.findOne({ email });
    if (existeEmail) {
        throw new Error(`El correo: ${email}, ya está registrado`);
    }
});
exports.existeEmail = existeEmail;
const existeClientById = (id = "") => __awaiter(void 0, void 0, void 0, function* () {
    const existeClient = yield models_1.Client.findById(id);
    if (!existeClient) {
        throw new Error(`El id: ${id} no existe`);
    }
});
exports.existeClientById = existeClientById;
const existeWearProductById = (id = "") => __awaiter(void 0, void 0, void 0, function* () {
    const existeProduct = yield models_1.WearProduct.findById(id);
    if (!existeProduct) {
        throw new Error(`El id: ${id} no existe`);
    }
});
exports.existeWearProductById = existeWearProductById;
const allowedCollections = (collection = "", collections = []) => {
    const include = collections.includes(collection);
    if (!include) {
        throw new Error(`La coleccion: ${collection} no es permitida. Estas si son permitidas: ${collections}`);
    }
    return true;
};
exports.allowedCollections = allowedCollections;
