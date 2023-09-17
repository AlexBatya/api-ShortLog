import fs from 'fs';
import path from 'path';

import express from 'express';
import color from 'colors';
import bodyParser from 'body-parser';
import cors from 'cors';

import routers from './routes';

const app               :       any             =       express();
const configs           :       string          =       '../config';
const serverConfig      :       any             =       fs.readFileSync(path.join(__dirname, configs, 'localhost.json'));

const config            :       any             =       JSON.parse(serverConfig)

app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true}));  
app.use(bodyParser.json({ limit: '2000mb' }));  

app.use('/api', routers)

app.listen(config.PORT, () => console.log(color.green('Сервер запущен, батеньки...')));

