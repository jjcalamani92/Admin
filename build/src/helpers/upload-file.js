"use strict";
// const path = require("path");
// const { v4: uuidv4 } = require('uuid');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const uploadFile = (files, validExtension = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const shortName = file.name.split('.');
        const extension = shortName[shortName.length - 1];
        if (!validExtension.includes(extension)) {
            return reject(`La extension ${extension} no es permitida, Estas son permitidas: ${validExtension}`);
        }
        const nameTemp = (0, uuid_1.v4)() + '.' + extension;
        const uploadPath = path_1.default.join(__dirname, '../uploads/', folder, nameTemp);
        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(nameTemp);
        });
    });
};
exports.uploadFile = uploadFile;
