import log4js from 'log4js';
import os from 'os';

const logger = log4js.getLogger();

export const getInfo = (req, res) => {
    logger.info('Info page');
    let info = {
        entryArguments: process.argv.slice(2),
        platformName: os.release(),
        nodeVersion: process.version,
        rss: process.memoryUsage().rss,
        execPath: process.execPath,
        pid: process.pid,
        currentWorking: process.cwd(),
        processCount: os.cpus().length,
    }
    res.render('info', info);
}

export const getActiveSession = (req, res) => {
    logger.info('inicia metodo [activeSession]');
    try {
        if( req.session ) throw new Error('No hay sesión activa');
        logger.info('Session: ', req.session);
        res.send(req.session);
    } catch (error) {
        errorLogger.error('Error: ', error.message);
        res.send({ error: error.message }).status(400);
    }
}

export const showCockies = (req, res) => {
    logger.info('Cookies: ', req.cookies);
    res.send(req.cookies);
}