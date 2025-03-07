import fs from 'fs';
import path from 'path';
import express from 'express';
import color from 'colors';
import bodyParser from 'body-parser';
import cors from 'cors';

import routers from './routes';

const app: express.Application = express();
const configs: string = '../config';
const serverConfig: any = fs.readFileSync(path.join(__dirname, configs, 'localhost.json'));
const config: any = JSON.parse(serverConfig);

// Функция для проверки и создания папок
const createFoldersIfNotExist = () => {
  const baseDir = path.join(__dirname, '../data'); // Базовая папка data
  const folders = [
    baseDir, // Папка data
    path.join(baseDir, 'videos'), // Папка videos
    path.join(baseDir, 'shortVideos'), // Папка shortVideos
    path.join(baseDir, 'cuts'), // Папка cuts
  ];

  folders.forEach((folder) => {
    try {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true }); // recursive: true создает все родительские папки, если их нет
        console.log(color.green(`Папка создана: ${folder}`));
      } else {
        console.log(color.yellow(`Папка уже существует: ${folder}`));
      }
    } catch (error) {
      console.error(color.red(`Ошибка при создании папки ${folder}: ${error}`));
    }
  });
};

// Вызов функции для проверки и создания папок
createFoldersIfNotExist();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '2000mb' }));

// Роуты
app.use('/api', routers);

// Запуск сервера
app.listen(config.PORT, () => {
  console.log(color.green(`Сервер запущен, батеньки... Порт: ${config.PORT}`));
});
