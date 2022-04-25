import { Router } from "express";
import { check } from "express-validator";
import { createClient, deleteClient, getClient, getClients, updateClient } from "../controllers";
import { esRolValido, existeClientById, existeEmail } from "../helpers";
import { tieneRol, validarCampos, validarJWT } from "../middlewares";


class ClientRoutes {
  router: Router;
  
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    //FIXME: GET CLIENT
    this.router.get('/:id', [
      check("id", "No es un id de Mongo valido").isMongoId(),
      check("id").custom(existeClientById),
      validarCampos,
    ], getClient);

    //FIXME: GET CLIENTS
    this.router.get('/', getClients);

    //FIXME: CREATE CLIENT
    this.router.post('/', [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('password', 'El password debe de ser de 6 caracteres').isLength({
        min: 6,
      }),
      check('email').custom( existeEmail ),
      check('rol').custom( esRolValido ),
      validarCampos
    ], createClient);

  //FIXME: UPDATE CLIENT
    this.router.put('/:id', [
      check('id', 'No es un ID válido').isMongoId(),
      check('id').custom( existeClientById ),
      check('rol').custom( esRolValido ),
      validarCampos
    ], updateClient);

  //FIXME: DELETE CLIENT
    this.router.delete('/:id', [
      validarJWT,
      // esAdminRol,
      tieneRol('ADMIN_ROL', 'VENTAS_ROL','CLIENT_ROL'),
      check('id', 'No es un ID válido').isMongoId(),
      check('id').custom( existeClientById ),
      validarCampos
    ], deleteClient);
  }
}

export const clientRoutes = new ClientRoutes().router;
// module.exports = userRoutes.router;