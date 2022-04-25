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
exports.validarJWT = void 0;
const models_1 = require("../models");
const jwt = require('jsonwebtoken');
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la petición' });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // Leer el usuario que corresponde al uid
        const client = yield models_1.Client.findById(uid);
        if (!client) {
            return res.status(401).json({ msg: 'Token no válido - usuario no existe en BD' });
        }
        // Verificar si el uid tiene estado true
        if (!client.status) {
            return res.status(401).json({ msg: 'Token no válido - usuario con estado: false' });
        }
        req.client = client;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Token no válido' });
    }
});
exports.validarJWT = validarJWT;
