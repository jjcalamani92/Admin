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
exports.deleteClient = exports.updateClient = exports.createClient = exports.getClients = exports.getClient = void 0;
const models_1 = require("../models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//TODO: GET CLIENT
const getClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const client = yield models_1.Client.findById(id).select('name email status').lean();
    res.json(client);
});
exports.getClient = getClient;
//TODO: GET CLIENTS
const getClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };
    const [total, clients] = yield Promise.all([
        models_1.Client.countDocuments(query),
        models_1.Client.find(query).select('name email status').skip(Number(desde)).limit(Number(limite))
    ]);
    res.json({ total, clients });
});
exports.getClients = getClients;
//TODO: CREATE CLIENT
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, rol } = req.body;
    const client = new models_1.Client({ name, email, password, rol });
    // Verificar si el correo existe
    // Encriptar la contraseña
    const salt = bcryptjs_1.default.genSaltSync();
    client.password = bcryptjs_1.default.hashSync(password, salt);
    // Guardar en BD
    yield client.save();
    res.json({ client });
});
exports.createClient = createClient;
//TODO: UPDATE CLIENT
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, password, google, email } = _a, resto = __rest(_a, ["_id", "password", "google", "email"]);
    if (password) {
        const salt = bcryptjs_1.default.genSaltSync();
        resto.password = bcryptjs_1.default.hashSync(password, salt);
    }
    const client = yield models_1.Client.findByIdAndUpdate(id, resto, { new: true });
    res.json({ client });
});
exports.updateClient = updateClient;
//TODO: DELETE CLIENT
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const client = yield models_1.Client.findByIdAndUpdate(id, { status: false }, { new: true }).select('name email status');
    res.json(client);
});
exports.deleteClient = deleteClient;
