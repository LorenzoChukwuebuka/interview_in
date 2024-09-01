 import { Service } from 'typedi';
import Route from './route';
import { CountriesController } from '../controller/countries.controller';

@Service()
export class CountryRouter extends Route<any> {
    constructor(private readonly countryController: CountriesController) {
        super()
        this.initRoutes();
    }

    initRoutes() {
        this.router.get("/", this.countryController.get)
    }

}
