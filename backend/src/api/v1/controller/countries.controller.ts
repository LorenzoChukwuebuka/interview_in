import { Service } from "typedi";
import { fail, success } from "../utils/response";
import { NextFunction, Request, Response } from "express";
import { CountryService } from "../service/coutries.service";

@Service()

export class CountriesController {
    constructor(private readonly countryService: CountryService) { }

    get = async (request: Request, response: Response, next: NextFunction) => {
        try {
            let { query, limit, page } = request.query
            let result = await this.countryService.getCountries(<string>query, Number(limit), Number(page))
            return response.json({
                "status": true,
                "message": "retrieved successfully",
                "payload": result
            })
        } catch (error: any) {
            return response.json({
                "status": true,
                "message": "failed",
                "error": error.message
            })
        }
    }
}