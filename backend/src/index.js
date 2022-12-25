const express = require('express');
require('express-async-errors');

const cors = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(3001, () => console.log('Server is running on port 3001'));
