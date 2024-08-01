import { Request, Response, NextFunction } from 'express';
import { httpStatus } from '../enums/http.status';
import { logger } from '../logger/logger.pino';

const validateMiddlware = (fields: string[]) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | Response> => {
        try {
            const missingFields = fields.filter((field) => !(field in req.body));

            if (missingFields.length > 0) {
                logger.info(`Request fields: ${missingFields} is missing`);
                return res
                    .status(httpStatus.BadRequest)
                    .json({ error: `Request fields: ${missingFields} is missing` });
            }

            next();
        } catch (e) {
            logger.info(e);
            return res.status(httpStatus.BadRequest).json(e);
        }
    };
};

export default validateMiddlware;
