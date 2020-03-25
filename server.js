const config = require('./config');
const express = require('express');

const app = express();
app.disable('x-powered-by');

const router = require('./router');
app.use(router);

const port = config.http_port;
app.listen(port, () => console.log(`Listening on: ${port}`));
