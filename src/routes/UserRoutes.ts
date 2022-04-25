import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers";


class UserRoutes {
  router: Router;
  
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/:id', getUser);
    this.router.get('/', getUsers);
    this.router.post('/', createUser);
    this.router.put('/:id', updateUser);
    this.router.delete('/:id', deleteUser);
  }
}

export const userRoutes = new UserRoutes().router;
// module.exports = userRoutes.router;