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
exports.getImage = exports.updateImageCloudinary = exports.uploadFiles = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const uploadFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({ msg: "No hay archivos que subir." });
        return;
    }
    try {
        // const name = await uploadFile( req.files, ['txt', 'md'], '.txt'  );
        const name = yield (0, helpers_1.uploadFile)(req.files, undefined, "img");
        res.json({ name });
    }
    catch (msg) {
        res.status(400).json({ msg });
    }
});
exports.uploadFiles = uploadFiles;
const updateImageCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, collection } = req.params;
    let model;
    switch (collection) {
        case "clients":
            model = yield models_1.Client.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`,
                });
            }
            break;
        case "products":
            model = yield models_1.WearProduct.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`,
                });
            }
            break;
        default:
            return res.status(500).json({ msg: "Se me olvidó validar esto" });
    }
    // Limpiar imágenes previas
    if (model.img) {
        // Hay que borrar la imagen del servidor
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy(public_id);
    }
    const { tempFilePath } = req.files.file;
    const { secure_url } = yield cloudinary.uploader.upload(tempFilePath);
    // const name = await uploadFile( req.files, undefined, collection );
    model.img = secure_url;
    yield model.save();
    res.json(model);
});
exports.updateImageCloudinary = updateImageCloudinary;
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, collection } = req.params;
    let model;
    switch (collection) {
        case "clients":
            model = yield models_1.Client.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`,
                });
            }
            break;
        case "wearproducts":
            model = yield models_1.WearProduct.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`,
                });
            }
            break;
        default:
            return res.status(500).json({ msg: "Se me olvidó validar esto" });
    }
    // Limpiar imágenes previas
    if (model.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path_1.default.join(__dirname, '../uploads', collection, model.img);
        if (fs_1.default.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }
    const pathImagen = path_1.default.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImagen);
});
exports.getImage = getImage;
