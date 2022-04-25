import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { userRoutes, clientRoutes, wearProductsRoutes, authRoutes, searchRoutes, uploadRoutes } from './routes';
const { dbConnection } = require('./database/config');

class Server {

  public app:express.Application;
  port: string | undefined;
  userPath: string;
  authPath: string;
  searchPath: string;
  clientPath: string;
  uploadPath: string;
  wearProductPath: string;
  
  constructor() {
    this.app = express();
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
  async conectarDB() {
    await dbConnection();
  }

  //Middlewares
  middlewares() {
    this.app.use(morgan('dev'));
    //Lectura y Parseo del body
    this.app.use( express.json() );

    this.app.use( express.urlencoded({extended: false}) );
    // Directorio puclico
    this.app.use( express.static("public" ));

    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());

    //Carga de archivos
    this.app.use( fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true,
    }) );
  }
  routes() {
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.wearProductPath, wearProductsRoutes);
    this.app.use(this.userPath, userRoutes);
    this.app.use(this.clientPath, clientRoutes);
    this.app.use(this.searchPath, searchRoutes);
    this.app.use(this.uploadPath, uploadRoutes);
  }
  start() {
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);
    });
  }
}

module.exports = Server;