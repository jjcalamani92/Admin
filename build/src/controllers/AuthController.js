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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const models_1 = require("../models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helpers_1 = require("../helpers");
//TODO: LOGIN
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verificar si el email existe
        const client = yield models_1.Client.findOne({ email }).select('email status rol password');
        if (!client) {
            return res.status(400).json({ msg: 'Email/ Password no son correctos - email' });
        }
        // Verificar si el usuario existe
        if (!client.status) {
            return res.status(400).json({ msg: 'Email/ Password no son correctos - estado: false' });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs_1.default.compareSync(password, client.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Email/ Password no son correctos - password'
            });
        }
        // Generar el JWT
        const token = yield (0, helpers_1.generarJWT)(client.id);
        res.json({
            client,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.login = login;
