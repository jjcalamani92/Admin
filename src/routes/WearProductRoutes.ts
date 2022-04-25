import { Router } from "express";
import { check } from "express-validator";
import { getWearProduct, getWearProducts, createWearProduct, updateWearProduct, deleteWearProduct } from '../controllers';
import { existeWearProductById } from "../helpers";
import { tieneRol, validarCampos, validarJWT } from "../middlewares";

class WearProductsRoutes {
  router: Router;
  
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    //FIXME: GET WEARPRODUCT
    this.router.get('/:id', [
      check("id", "No es un id de Mongo valido").isMongoId(),
      check("id").custom(existeWearProductById),
      validarCampos,
    ], getWearProduct);

    //FIXME: GET WEARPRODUCTS
    this.router.get('/', getWearProducts);

    //FIXME: CREATE WEARPRODUCT
    this.router.post('/', [
      validarJWT,
      check('title', 'El nombre del producto es obligatorio').not().isEmpty(),
      validarCampos
    ], createWearProduct);

    //FIXME: PUT WEARPRODUCT
    this.router.put('/:id', [
      validarJWT,
      check("id").custom(existeWearProductById),
      validarCampos
    ], updateWearProduct);

    //FIXME: DELETE WEARPRODUCT
    this.router.delete('/:id', [
      validarJWT,
      tieneRol('ADMIN_ROL', 'CLIENT_ROL'),
      check('id', 'No es un ID válido').isMongoId(),
      check("id").custom(existeWearProductById),
      validarCampos
    ], deleteWearProduct);
  }
}

export const wearProductsRoutes = new WearProductsRoutes().router;
// module.exports = wearProductsRoutes.router;