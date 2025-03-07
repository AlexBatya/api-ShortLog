import fs from 'fs';
import path from 'path';
import Gluing from '../api/gluing';

const forBodyFfmpeg = async (shortVideo: Gluing, dirIn: string, dirOut: string, dirCut: string, file: string, parts: number, shortTime: number, num: string) => {
  try {
    const timeAll: any = await shortVideo.timeVideo(dirIn + file); // Общее время видео
    const interTime: number = shortVideo.equalPartsTime(parts + 1, timeAll); // Интервалы между кадрами
    const tmp: string = './data/tmp/';

    for (let i = 0; i < timeAll; i += interTime) {
      await shortVideo.cutVideo(dirCut, dirIn + file, `${i}`, i, shortTime);
    }

    await shortVideo.merge(dirCut, dirOut + 'preview-' + num, tmp);
    await shortVideo.deleteShortVideos(dirCut);
  } catch (error) {
    console.error(`Ошибка при обработке видео ${file}:`, error);
    throw new Error(`Ошибка при обработке видео ${file}: ${error.message}`);
  }
};

class CreateVideoServices {
  async createAllVideos(data: any) {
    try {
      const dirIn: string = data.dirIn;
      const parts: number = data.parts;
      const shortTime: number = data.shortTime;
      const dirOut: string = data.dirOut;
      const dirCut: string = './data/cuts/';

      // Проверка существования директории
      if (!fs.existsSync(dirIn)) {
        throw new Error(`Директория ${dirIn} не существует`);
      }

      const filesOfDir: string[] = fs.readdirSync(dirIn);
      const filesOfDirWithoutExm: string[] = filesOfDir.map((elem: string) => path.basename(elem, path.extname(elem)));

      const shortVideo = new Gluing();

      for (let file of filesOfDirWithoutExm) {
        await forBodyFfmpeg(shortVideo, dirIn, dirOut, dirCut, file, parts, shortTime, file);
      }

      return 'Видео успешно добавлены в папку';
    } catch (error) {
      console.error('Ошибка в CreateVideoServices:', error);
      throw new Error(`Ошибка при создании видео: ${error.message}`);
    }
  }
}

export default new CreateVideoServices();
