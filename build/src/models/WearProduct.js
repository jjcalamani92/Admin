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
exports.WearProduct = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const wearProductSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    mark: { type: String },
    image: [{ type: String }],
    description: { type: String, required: true },
    inStock: { type: Number, required: true, default: 0 },
    sizes: [{ type: String, enum: { values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], message: '{VALUE} no es un tamaño permitido' } }],
    slug: { type: String, required: true, unique: true },
    line: { type: String, required: true },
    category: { type: String, enum: { values: ['men', 'women', 'kid', 'unisex'], message: '{VALUE} no es una categoria válida' } },
    subCategory: { type: String, enum: { values: ['chamarras', 'pantalones', 'poleras', 'camisas'], message: '{VALUE} no es un tipo válido' } },
    price: { type: Number, required: true, default: 0 },
    oldPrice: { type: Number, required: true, default: 0 },
    tags: [{ type: String }],
    client: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Client', required: true },
    status: { type: Boolean, default: true, required: true },
}, {
    timestamps: true
});
wearProductSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, data = __rest(_a, ["__v"]);
    return data;
};
wearProductSchema.index({ title: 'text', tags: 'text' });
exports.WearProduct = mongoose_1.default.models.WearProduct || (0, mongoose_1.model)('WearProduct', wearProductSchema);
