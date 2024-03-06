const helmet = require('helmet');
const express = require('express');
const parser = require('body-parser');

const nameRoutes = require('./src/routes/names');

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(204).json({});
  }
  next();
});

app.use(nameRoutes);

app.listen(9000, () => console.log('Backend started on 9000 port!'));

module.exports = { app }