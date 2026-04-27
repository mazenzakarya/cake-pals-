const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const indexRoutes = require('./routes/index');
const apiErrorHandler = require('./error/api-error-handler');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());


// Routees
app.use('/api', indexRoutes);

// Global error handler
app.use(apiErrorHandler);

module.exports = app;