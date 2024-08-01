import express from 'express';
import controller from '../controllers/controller';
import validateMiddlware from '../middleware/validate.middlware';

const router = express.Router();

router.get(
    '/estimate',
    validateMiddlware(['inputAmount', 'inputCurrency', 'outputCurrency']),
    controller.estimate
);

router.get(
    '/getRates',
    validateMiddlware(['baseCurrency', 'quoteCurrency']),
    controller.getRates
);

export default router;
