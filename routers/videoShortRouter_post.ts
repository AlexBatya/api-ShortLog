import fs from 'fs';
import path from 'path';
import Gluing from '../modules/gluing';

function sendShortVideo(fileLink: string){
    return new Promise((res: any) => {
        const chunks = [];
        const readStream = fs.createReadStream(fileLink);
        readStream.on('data', (chunk: any) => chunks.push(chunk));
        readStream.on('end', () => {
            res(Buffer.concat(chunks));
        })
    })
}

export default (token: string, app: any): void => {
    app.post('/short-video-download', async (req: any, res: any) =>{
        if(req.headers.authorization == 'Bearer ' + token){


            const writeStream = fs.createWriteStream('./data/video.mp4');
            writeStream.write(Buffer.from(req.body.video, 'utf-8'));
            

            const parts:           number       = req.body.parts; // Колличество частей короткого видео для скейки
            const shortTime:       number       = req.body.shortTime; // Длительность короткого кадра 

            const data:            string       = './data/' // папка со всеми промежуточными данными
            const dir:             string       = './data/cuts/' //Директория для хранения коротких видео
            const tmp:             string       = './data/tmp/' //Промежуточная папка для склейки
            const video:           string       = 'video' // Видео, которое необходимо обрезать
            const shortVideoLink:  string       = 'shortVideo' // название конечного обрезанного видео

            const shortVideo                    = new Gluing();

            const timeAll:         any            = await shortVideo.timeVideo(data + video); // Общее время видео 
            const interTime:       number         = shortVideo.equalPartsTime(parts - 1, timeAll); // Интервалы между кадрами

            for(let i = 0; i < timeAll; i += interTime){
                await shortVideo.cutVideo(dir, data + video, `part${i}`, i, shortTime);
            }

            await shortVideo.merge(dir, data + shortVideoLink, tmp);

            await shortVideo.deleteShortVideos(dir);

            await res.json(await sendShortVideo(data + shortVideoLink + '.mp4'))

            
        }
        else{
            console.log('Нет доступа')
        }
    })
    app.post('/short-video', (req: any, res: any) => {

    }) 
}