<a id = 'name'></a>
# API-ShortLog для нарезки видео  
***
<!-- ![color picker](./gitimg/previu.gif) -->
<img src="./gitimg/previu.gif" alt="drawing" height= '400px' width="100%"/>

# Оглавление 
* [Основная информация](#mainInfo)
* [Установка](#setup)
* [Пакеты](#packages)
* [Версии](#vertions)
* [Запрос/ответ](#reqres)
* [Входные параметры](#inputs)
* [Примеры](#exampl)
    * [nodeJS](#nodejs)
* [keys.json](#keys)
* [Применение](#gifi)

<a id = 'mainInfo'></a>

## Основная информация
Таблица №1 - основная информация
|**Автор**| AlexeyBatya |
|:-|:-|
|**Задача**|Разработать ПО для нарезки полной версии видео на 6-ти секундный или произвольной, изначально заданный в запросе длины, ролик|
|**Возможности**|ПО позволяет нарезать видео в необходимых местах по 1 секунде|
|**Бизнес постановка**|Ознакомить клиента с продукцией компании|
<a id = 'setup'></a>

## Установка 
1. Установите на компьютер (сервер) nodeJS. [Ссылка на скачивание](https://nodejs.org/en/download). Если у вас linux или mac OS - ```sudo apt install nodeJS```, но лучше использовать сборку.
2. Установите пакетный менеджер ```npm``` - ```sudo apt install npm```
3. Импортируйте файлы ```https://github.com/AlexBatya/videoEngine.git```, в корневом каталоге запустите команду: ```npm install ```
Если вы планируете поместить программу на сервер, дополнительно установите ```pm2``` или ```forever```. Я обычно использую ```pm2``` - ```npm install pm2 -g```
##

<a id = 'packages'></a>

## Пакеты 
Таблица №2 - пакеты используемые в приложении
|Пакет|Версия|Назначение|
|:-|:-|:-|
|```express```|```4.18.2```|ПО для разработки web-приложения|
|```fluent-ffmpeg```|```^2.1.2```|ПО для обработки фото, видео и аудио материалов|
|```body-parser```|```1.20.2```|парсить данные ```HTTP POST``` запросов|
|```colors```|```1.4.0```|настройка подсветки командной строки|
|```axios```|```1.4.0```|тестирование|

Таблица №3 - пакеты для среды разработки
|Пакет|Версия|Назначение|
|:-|:-|:-|
|```@types/node```|```^20.4.9```|Поддержка синтаксиса typescript|
|```eslint```|```4.18.2```|Структурирования файлов javascript|
<a id = 'vertions'></a>

## Версии
Таблица №4 - версии api-short-log
|Версия|Ссылка|Ветка|Изменения|
|:-|:-:|:-|:-|
|1.0|https://github.com/AlexBatya/videoEngine.git|vertion1.0|-|
<a id = 'reqres'></a>

## Запрос/Ответ

Таблица №5 - запрос/ответ
|Элемент|Запрос|Тело запроса (свойства объекта)|Цель|Ответ|
|:-|:-|:-|:-|:-|
|short-видео|``` POST /short-video-download```|```video, parts, shortTime```|скачать обработанный ролик|```object```|
|Обработка всех видео|``` POST /shortAll-videos-cut```|```dirIn, dirOut, parts, shortTime```|Обработка всех видео, находящихся на сервере в указанной папке|```object```|
|Директория видео|``` GET /checkData```|```-```|Просмотреть папки в дериктории ```./data/```|```object```|
|videos-shortVideos|``` Post /checkVideos```|```dir```|Посмотреть содержимое выбранной папки|```object```|
<a id = 'inputs'></a>

## Входные параметры
Таблица №6 - входные параметры
|№|Параметр|Тип данных|Описание|Варианты значений|
|:-|:-|:-|:-|:-|
|1|video|```object```|буферизированные соединённые в единый массив данные|```<Buffer 00 00 00 18 66 74 79 70 6d 70 34 32 00 00 00 00 69 73 6f 6d 6d 70 34 32 00 01 69 2b 6d 6f 6f 76 00 00 00 6c 6d 76 68 64 00 00 00 00 dc 73 11 af dc 73 ... 27297191 more bytes>```|
|2|parts|```number```|колличество на которое нужно поделить видео|6|
|3|shortTime|```number```|длительность одной короткой части видео (секунды)|1|
|4|dir|```string```|папка|```./data/videos/'```|
|5|dirIn|```string```|пвпка в которой лежат исходные видео|```./data/videos/'```|
|6|dirOut|```string```|пвпка в которую будут выгружаться готовые видео|```./data/videos/'```|
<a id = 'exampl'></a>

## Примеры
<a id = 'nodejs'></a>

**nodeJS**
Желательно выбирать потоковую передачу данных.
```javascript
const axios = require('axios');

const urlAll = 'http://localhost:3001'; //Номер порта 
const token = JSON.parse(fs.readFileSync('../keys.json')).key_token;

const axiosConfigPOST = (elem, url) => {
    return {
        method: 'POST',
        url: urlAll + url, 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        data: JSON.stringify(elem)
    }
};

(async () => {
    const dir               =  './media/' //директория, где лежат медиа материалы
    const videoLink         =  'video4'; // название видео без расширения
    const shortVideoLink    =  'shortVideo'; // название готового короткого видео
    const parts             =   6; // колличество частей. Смотри таблицу №6
    const shortTime         =   1; // тайминки отрывка. Смотри таблицу №6

    const video = fs.createReadStream(dir + videoLink + '.mp4');
    let chunks = [];
    video.on('data', chunk => chunks.push(chunk));
    video.on('end', async () => {
        const info = {
            video: Buffer.concat(chunks),
            parts: parts,
            shortTime: shortTime,
        } 
        const dataReq = await axios(axiosConfigPOST(info, '/short-video-download'));
        const writeStream = fs.createWriteStream(dir + shortVideoLink + '.mp4');
        writeStream.write(Buffer.from(dataReq.data, 'utf-8'));
    })
})();
    
```
<a id = 'keys'></a>

## keys.json
```keys.json``` - файл ключей доступа к ```POST-запросам```. Необходимо придумать свой ключ и поместить его в корневую папку с проектом.
Ключ необходимо передавать в заголовке запроса ```'bearer ' + token```
```json
{
    "key_token": ""
}
```
<a id = 'gifi'></a>

## Применение 
Данное видео мы можем поместить как превью к основному ролику и запускать его при наведении на блок с видео.
![](./gitimg/htmlTest.gif) 
[Вернуться наверх](#name)