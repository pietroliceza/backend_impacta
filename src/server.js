const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const server = express();
server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(3001, () => console.log('Rodando...'));
