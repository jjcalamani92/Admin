import { Router } from "express";
import { check } from "express-validator";
import { uploadFiles, updateImageCloudinary, getImage } from '../controllers';
import { allowedCollections } from "../helpers";
import { validateFileUpload } from "../middlewares";
import { validarCampos } from '../middlewares/validar-campos';


class UploadRoutes {
  router: Router;
  
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post('/', uploadFiles);
    
    this.router.put('/:collection/:id', [
      validateFileUpload,
      check('id', 'El id debe de ser de mongo').isMongoId(),
      check('collection').custom( c => allowedCollections( c, ['clients', 'wearproducts']) ),
      validarCampos
    ], updateImageCloudinary);

    this.router.get('/:collection/:id', [
      check('id', 'El id debe de ser de mongo').isMongoId(),
      check('collection').custom( c => allowedCollections( c, ['clients', 'wearproducts']) ),
      validarCampos
    ], getImage);

  }
}

export const uploadRoutes = new UploadRoutes().router;