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
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const { dbConnection } = require('./database/config');
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.userPath = '/api/users';
        this.clientPath = '/api/clients';
        this.searchPath = '/api/search';
        this.uploadPath = '/api/upload';
        this.wearProductPath = '/api/wearproducts';
        //Conectar a la base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        this.routes();
    }
    //Base de Datos
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection();
        });
    }
    //Middlewares
    middlewares() {
        this.app.use((0, morgan_1.default)('dev'));
        //Lectura y Parseo del body
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        // Directorio puclico
        this.app.use(express_1.default.static("public"));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)());
        //Carga de archivos
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));
    }
    routes() {
        this.app.use(this.authPath, routes_1.authRoutes);
        this.app.use(this.wearProductPath, routes_1.wearProductsRoutes);
        this.app.use(this.userPath, routes_1.userRoutes);
        this.app.use(this.clientPath, routes_1.clientRoutes);
        this.app.use(this.searchPath, routes_1.searchRoutes);
        this.app.use(this.uploadPath, routes_1.uploadRoutes);
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server on port ${this.port}`);
        });
    }
}
module.exports = Server;
