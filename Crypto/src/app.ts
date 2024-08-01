import express from 'express';
import { logger } from './logger/logger.pino';
import router from './routers/routes';
import dotenv from 'dotenv';

dotenv.config();

const POTR = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/crypto', router);

const start = () => {
    try {
        app.listen(POTR, () => {
            logger.info(`Server starting on port ${POTR}`);
        });
    } catch (e) {
        logger.info(e);
    }
};

start();
