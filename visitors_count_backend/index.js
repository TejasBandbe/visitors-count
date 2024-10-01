const express = require('express');
const cors = require('cors');
require('dotenv').config();
const visitorsRouter = require('./visitorsRouter');

const app = express();

app.use(cors('*'));
app.use(express.json());
app.use('/api', visitorsRouter);

app.listen(process.env.SERVER_PORT, '0.0.0.0', () => {
    console.log('server started at port '+process.env.SERVER_PORT+'...');
});

