import "reflect-metadata";
import express, { Application } from "express";
import cors from 'cors';
import morgan from "morgan";

import Container from "typedi";
import Route from "./routes/route";
import { CountryRouter } from "./routes/country.route";


Container.set('useAuth', true);

class App {
    private app: Application;

    private apiVersion = '/api';
    private routes: Record<string, Route<any>> = {
        "country": Container.get(CountryRouter)
    };

    constructor() {
        this.app = express();

        this.configureMiddleware();
        this.initRoutes();
    }

    private configureMiddleware(): void {
        this.app.use(express.json());
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(morgan('short'));
    }

    private initRoutes(): void {
        Object.entries(this.routes).forEach(([url, route]) => {
            this.app.use(`${this.apiVersion}/${url}`, route.router);
        });


        this.app.get('/', (req, res) => {
            res.status(200).json({ message: 'WELCOME' });
        });
    }



    public async start(): Promise<void> {
        try {
            const PORT = process.env.PORT || 5000;
            this.app.listen(PORT, (): void => {
                console.log(`Server Running here 👉 http://localhost:${PORT}`);
            });
        } catch (error) {
            console.error("Failed to start the application:", error);
            process.exit(1);
        }
    }
}

export default App;