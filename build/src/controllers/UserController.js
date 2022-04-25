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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = exports.getUser = void 0;
const models_1 = require("../models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//TODO: obtener usuario
const getUser = (req, res) => {
    res.json('getUser- controlador');
};
exports.getUser = getUser;
//TODO: obtener usuarios
const getUsers = (req, res) => {
    res.json('getUsers- controlador');
};
exports.getUsers = getUsers;
//TODO: Crear usuario
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, rol } = req.body;
    const user = new models_1.User({ name, email, password, rol });
    // Verificar si el correo existe
    //Encriptar la contraseña
    const salt = bcryptjs_1.default.genSaltSync();
    user.password = bcryptjs_1.default.hashSync(password, salt);
    //Guardar en BD
    yield user.save();
    res.json({ user });
});
exports.createUser = createUser;
//TODO: Actualizar usuario
const updateUser = (req, res) => {
    res.json('updateUser- controlador');
};
exports.updateUser = updateUser;
//TODO: eliminar usuario
const deleteUser = (req, res) => {
    res.json('deleteUser- controlador');
};
exports.deleteUser = deleteUser;
