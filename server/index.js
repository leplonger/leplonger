const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Router
const router = require('./routes.js');

// Serve static files
app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use(express.static(path.join(__dirname, '../client/assets/')));

// All routes handled here
app.use('/', router);

app.listen(port, () => {
  console.log('server running on port ', port);
});
