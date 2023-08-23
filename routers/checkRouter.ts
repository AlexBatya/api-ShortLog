import fs from 'fs';
import path from 'path';

export default function checkServer(token: string, app: any){
    app.get('/check', (req: any, res: any) => {
        if(req.headers.authorization == 'Bearer ' + token){
            res.json(200);
        }
        else{
            res.json('403 (нет доступа)')
        }
    })
    app.get('/check-data', (req: any, res: any) => {
        if(req.headers.authorization == 'Bearer ' + token){
            const dir = fs.readdirSync('./data/')
            res.json(dir)
        }
        else{
            res.json('403 (нет доступа)')
        }
    })
    app.post('/check-videos', (req: any, res: any) => {
        if(req.headers.authorization == 'Bearer ' + token){
            const dir = fs.readdirSync(req.body.dir)
            res.json(dir.length)
        } 
        else{
            res.json('403 (нет доступа)')
        }
    })
    app.post('/upload-video', (req: any, res: any) => {
        if(req.headers.authorization == 'Bearer ' + token){

            const videoName:        string      = req.body.videoName;
            const video:            any         = req.body.video;

            const writeStream: any = fs.createWriteStream('./data/videos/' + videoName + '.mp4');
            writeStream.write(Buffer.from(video, 'utf-8'));
            res.json('Видео добавлено');
        }
        else{
            res.json('403 (нет доступа)')
        }
    })
    app.post('/download-video', async (req: any, res: any) => {
        if(req.headers.authorization == 'Bearer ' + token){
            const dir               =  './data/shortVideos/' //директория, где лежат медиа материалы
            const videoName =  req.body.videoName; // название видео без расширения

            const video = fs.createReadStream(dir + videoName+ '.mp4');
            let chunks = [];
            video.on('data', chunk => chunks.push(chunk));
            video.on('end', async () => {
                const video: any = Buffer.concat(chunks);
                res.json(video);
            })
        }
        else{
            res.json('403 (нет доступа)')
        }
    })
}