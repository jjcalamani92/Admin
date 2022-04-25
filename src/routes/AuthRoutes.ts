import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers";
import { validarCampos } from "../middlewares";


class AuthRoutes {
  router: Router;
  
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post('/login', [
      check('email', 'El email es obligatorio').isEmail(),
      check('password', 'El password es obligatorio').not().isEmpty(),
      validarCampos,
    ], login);
  }
}

export const authRoutes = new AuthRoutes().router;
// module.exports = userRoutes.router;