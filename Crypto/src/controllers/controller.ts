import { logger } from '../logger/logger.pino';
import { Request, Response } from 'express';
import { httpStatus } from '../enums/http.status';
import mainService from '../services/main.service';
import { EstimateDTO } from '../DTO/estimate';
import { GetRatesDTO } from '../DTO/get.rates';

export class Controller {
    async estimate(req: Request, res: Response) {
        try {
            const result = await mainService.estimate(new EstimateDTO(req.body));
            res.status(httpStatus.OK).json(result);
        } catch (e) {
            logger.info(e);
            res.status(httpStatus.BadRequest).json(e);
        }
    }
    async getRates(req: Request, res: Response) {
        try {
            const result = await mainService.getRates(new GetRatesDTO(req.body));
            res.status(httpStatus.OK).json(result);
        } catch (e) {
            logger.info(e);
            res.status(httpStatus.BadRequest).json(e);
        }
    }
}

const controller = new Controller();

export default controller;
