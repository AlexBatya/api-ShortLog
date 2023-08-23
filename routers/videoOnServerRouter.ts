import fs from 'fs';
import path from 'path';
import Gluing from '../modules/gluing';

const forBodyFfmpeg = (shortVideo: Gluing, dirIn: string, dirOut: string, dirCut: string, file: string, parts: number, shortTime: number, num: string) => new Promise(async (res: any) => {
    const timeAll:         any            = await shortVideo.timeVideo(dirIn + file); // Общее время видео 
    const interTime:       number         = shortVideo.equalPartsTime(parts + 1, timeAll); // Интервалы между кадрами
    const tmp:             string         = './data/tmp/'

    for(let i = 0; i < timeAll; i += interTime){
        await shortVideo.cutVideo(dirCut, dirIn + file, `${i}`, i, shortTime);
    }

    await shortVideo.merge(dirCut, dirOut + 'video' + num, tmp);

    await shortVideo.deleteShortVideos(dirCut);
    res()
})
    


export default function videoOnServerRouter(token: string, app: any){
    app.post('/shortAll-videos-cut', async (req: any, res: any) => {
        if(req.headers.authorization == 'Bearer ' + token){
            const dirIn:                    string        =       req.body.dirIn;
            const parts:                    number        =       req.body.parts;
            const shortTime:                number        =       req.body.shortTime;
            const dirOut:                   string        =       req.body.dirOut;
            const dirCut:                   string        =       './data/cuts/'

            const filesOfDir:               string[]      =       fs.readdirSync(dirIn);
            const filesOfDirWithoutExm:     string[]      =       filesOfDir.map((elem: string) => path.basename(elem, path.extname(elem)))

            const shortVideo                              =       new Gluing();

            for(let file of filesOfDirWithoutExm){
                await forBodyFfmpeg(shortVideo, dirIn, dirOut, dirCut, file, parts, shortTime, file)
            }
            res.json('Готово');
        }
        else{
            res.json('403 (нет доступа)')
        }
    })


}