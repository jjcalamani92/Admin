import { Router } from "express";
import { search } from "../controllers";


class SearchRoutes {
  router: Router;
  
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/:collection/:finished', search)
  }
}

export const searchRoutes = new SearchRoutes().router;