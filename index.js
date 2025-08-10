const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const app = express();
const port = process.env.PORT || 4000;

dbConnection();

app.use(express.static('public'));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
