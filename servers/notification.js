require('dotenv').config()
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('../middleware/error');

// Route files
const notificationRoute = require('../routes/notification');

const app = express();
// Body parser
app.use(express.json());
// Set security headers
app.use(helmet());
// Prevent XSS attacks
app.use(xss());
// Prevent http param pollution
app.use(hpp());
// Enable CORS
app.use(cors());

// Require our routes into the application.
app.get('/', (req, res) => {
  res.send({
      status: true,
      message: "You probably shouldn't be here, but...",
      data: {
        service: "nodejs pub-sub api",
        version: "1.0"
      }
    });
});

// Mount routers
app.use('/api/notification', notificationRoute);
app.use(errorHandler);

const PORT = process.env.PORT_2 || 5000;

app.listen(PORT,console.log( `notification Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
