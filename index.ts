import fs from 'fs';
import path from 'path';
import express from 'express';
import color from 'colors';
import bodyParser from 'body-parser';
import cors from 'cors';

import indexRout from './routers/index';


const PORT: number = 3001;
const app: any = express();
const key_file: string = './keys.json';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({ limit: '2000mb' }));

const file: any = fs.readFileSync(key_file);
const token = JSON.parse(file).key_token;


indexRout(token, app);

app.listen(PORT, () => console.log(color.green('Сервер запущен, батеньки')));