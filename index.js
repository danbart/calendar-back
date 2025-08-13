const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000;

dbConnection();

app.use(cors())

app.use(express.static('public'));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.use('/api/events', require('./routes/events'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
