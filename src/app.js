import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import FileStore from 'session-file-store';
import * as dotenv from 'dotenv';
import yargs from 'yargs/yargs';
import cluster from 'cluster';
import compression from 'compression';
import productRouter from './routes/api.js';
import { configureLogger, logger, warnLogger } from './config/logger.js';
import systemRouter from './routes/system.js';
import userRouter from './routes/user.js';

configureLogger();

dotenv.config();

const argv = yargs(process.argv.slice(1))
    .default('port', 8080)
    .default('modo', 'FORK')
    .alias('m', 'modo')
    .alias('c', 'cluster')
    .argv;

const app = express();

const PORT = Number(argv.port) || 8080;

const SERVER_TYPE = argv.modo || 'FORK';

if( SERVER_TYPE !== 'FORK' ) {
    if( cluster.isPrimary ) {
        for (let i = 0; i < os.cpus().length; i++) cluster.fork();
    } else {
        app.listen(PORT, () => logger.info(`Servidor iniciado en mondo ${ SERVER_TYPE } en el puerto ${ PORT } y el proceso ${ process.pid }`));
    }
} else {
    app.listen(PORT, () => logger.info(`Servidor iniciado en mondo ${ SERVER_TYPE } en el puerto ${ PORT } y el proceso ${ process.pid }`));
}

const Store = FileStore(session);

app.use(session({
    store: new Store({
        path: './src/sessions',
        ttl: 60
    }),
    secret: 'c0d3r-09',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.get('/activeSession', (req, res) => {
    res.send(req.session);
})

// initial config express
app.use(cookieParser());
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: true }));

// specific static resources
app.use(express.static('./src/public'));
app.use('/assets', express.static('./src/public'));
app.use('/scripts', express.static('./src/public'));

// server routes
app.use('/api', productRouter);
app.use('/system', systemRouter);
app.use('/user', userRouter)

// template engine config
app.set('views', './src/views');
app.set('view engine', 'pug');

// home page
app.get('/', (req, res) => res.render('home'));

app.use(function(req, res) {
    warnLogger.warn(`Error 404 - No encontrado [${ req.originalUrl }]`);
    res.status(404).send({ error: 'No encontrado' });
})