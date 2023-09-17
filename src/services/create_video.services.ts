import fs from 'fs';
import path from 'path';

import Gluing from '../api/gluing';

const forBodyFfmpeg = (shortVideo: Gluing, dirIn: string, dirOut: string, dirCut: string, file: string, parts: number, shortTime: number, num: string) => new Promise(async (res: any) => {
    const timeAll:         any            = await shortVideo.timeVideo(dirIn + file); // Общее время видео 
    const interTime:       number         = shortVideo.equalPartsTime(parts + 1, timeAll); // Интервалы между кадрами
    const tmp:             string         = './data/tmp/'

    for(let i = 0; i < timeAll; i += interTime){
        await shortVideo.cutVideo(dirCut, dirIn + file, `${i}`, i, shortTime);
    }

    await shortVideo.merge(dirCut, dirOut + 'preview-' + num, tmp);

    await shortVideo.deleteShortVideos(dirCut);
    res()
})

class CreateVideoServices{

    async createAllVideos(data: any){
        return new Promise(async (res: any) => {
            const dirIn:                    string        =       data.dirIn;
            const parts:                    number        =       data.parts;
            const shortTime:                number        =       data.shortTime;
            const dirOut:                   string        =       data.dirOut;
            const dirCut:                   string        =       './data/cuts/'

            const filesOfDir:               string[]      =       fs.readdirSync(dirIn);
            const filesOfDirWithoutExm:     string[]      =       filesOfDir.map((elem: string) => path.basename(elem, path.extname(elem)))

            const shortVideo                              =       new Gluing();

            for(let file of filesOfDirWithoutExm){
                await forBodyFfmpeg(shortVideo, dirIn, dirOut, dirCut, file, parts, shortTime, file)
            }
            res('Видео успешно дабавленны в папку');
        })
    }
}

export default new CreateVideoServices();