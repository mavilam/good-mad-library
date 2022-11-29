"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const goodreads_api_node_1 = __importDefault(require("goodreads-api-node"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const bookData_1 = require("./model/bookData");
const goodreadsUtils_1 = require("./utils/goodreadsUtils");
const logger_1 = __importDefault(require("./utils/logger"));
const myCredentials = {
    key: process.env['KEY'],
    secret: process.env['SECRET']
};
const gr = (0, goodreads_api_node_1.default)(myCredentials);
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
const serverURL = process.env['URL'];
const sitePort = Number(process.env['PORT']);
const frontURL = 'https://mavilam.github.io/good-mad-library';
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/', (req, res) => {
    return res.redirect(frontURL);
});
app.get('/init_oauth', (req, res) => {
    gr.initOAuth(`${serverURL}/goodreads_oauth_callback`);
    return gr.getRequestToken()
        .then(url => {
        res.status(200).json({ oAuthUrl: url });
    })
        .catch(err => {
        logger_1.default.error(err);
        res.status(500).json({ error: err });
    });
});
app.get('/goodreads_oauth_callback', (req, res) => {
    gr.getAccessToken()
        .then(() => {
        res.status(200).redirect(`${frontURL}#/callback`);
    });
});
app.get('/user-data', (req, res) => {
    return (0, goodreadsUtils_1.getUserData)(gr).then(data => {
        return res.status(200).json(data);
    })
        .catch(err => {
        logger_1.default.error(err);
        res.status(500).json({ error: err });
    });
});
app.get('/to-read', async (req, res) => {
    try {
        const userId = req.query.userid;
        let bookArr = await (0, goodreadsUtils_1.getToReadBooks)(gr, userId);
        if (!bookArr || bookArr.length < 1)
            return res.status(200).json([]);
        const bookData = bookArr.map(book => new bookData_1.BookData(book));
        return res.status(200).json(bookData);
    }
    catch (err) {
        logger_1.default.error(err);
        if (err.message.includes('need an oAuth'))
            return res.redirect(frontURL);
        res.status(500).json({ error: err });
    }
});
app.listen(sitePort, function () {
    logger_1.default.info(`I'm running on ${serverURL}:${sitePort}`);
});
