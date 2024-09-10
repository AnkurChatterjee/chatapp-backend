const express = require('express');
const cors = require('cors');
const sessions = require('express-session');
const {Logger} = require('./lib/Logger');
const routes = require('./api');

const app = express();

app.use(express.json({limit: '50mb'}));

app.use(express.urlencoded({extended: true}));

app.use(cors({credentials: true, origin: true}));

const measureRequestDuration = (req, res, next) => {
    const start = Date.now();
    res.once('finish', async () => {
        const duration = Date.now() - start;
        Logger.info('Logging API response stats', {
            url: req.originalUrl,
            baseUrl: req.baseUrl,
            time: `${duration} ms`,
            method: req.method,
            status: res.statusCode
        })
    })
    next();
};

app.use(measureRequestDuration);

app.use('/chatapp/api/', routes);

module.exports = app;


