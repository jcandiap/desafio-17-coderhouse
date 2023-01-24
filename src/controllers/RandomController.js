import log4js from 'log4js';

import { calculateRandoms } from '../services/RandomService.js';

const logger = log4js.getLogger();

export const getRandom = () => {
    logger.info('inicia metodo [random]');
    const numbers = calculateRandoms(req.params.cant);
    res.send(numbers);
}