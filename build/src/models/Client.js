"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.Client = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const clientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: 'CLIENT_ROL',
        emun: ['ADMIN_ROL', 'CLIENT_ROL', 'USER_ROL', 'VENTAS_ROL']
    },
    status: {
        type: Boolean,
        default: true
    },
    siteData: {
        name: { type: String },
        domain: { type: String },
        dataBase: { type: String },
        logo: { type: String },
        phoneNumber: { type: String },
        map: { type: String },
        pages: [{ type: String }],
        homeSliders: [{
                title: { type: String },
                content: { type: String },
                image: { type: String },
            }],
        homeBanners: [{
                title: { type: String },
                content: { type: String },
                image: { type: String },
            }],
    }
}, {
    timestamps: true
});
clientSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, password, _id } = _a, client = __rest(_a, ["__v", "password", "_id"]);
    client.uid = _id;
    return client;
};
exports.Client = mongoose_1.default.models.Client || (0, mongoose_1.model)('Client', clientSchema);
