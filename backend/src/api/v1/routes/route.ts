// File: routes/route.ts

import { Router } from 'express';


abstract class Route<T> {
    public router: Router;
    constructor() {
        this.router = Router();

    }

    abstract initRoutes(): void;
}

export default Route;