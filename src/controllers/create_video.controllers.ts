import createVideoServices from "../services/create_video.services";

class CreateVideoController {
  public async createAllVideos(req: any, res: any) {
    try {
      // Проверка авторизации
      if (req.headers.authorization !== '') {
        return res.status(403).send('Неверный ключ авторизации');
      }

      // Проверка наличия обязательных параметров
      if (!req.body.dirIn || !req.body.dirOut || !req.body.parts || !req.body.shortTime) {
        return res.status(400).send('Неверные параметры запроса');
      }

      // Вызов сервиса для создания видео
      const info = await createVideoServices.createAllVideos(req.body);
      return res.status(200).send({ data: info });
    } catch (error) {
      console.error('Ошибка в CreateVideoController:', error);
      return res.status(500).send('Произошла ошибка при обработке запроса');
    }
  }
}

export default new CreateVideoController();
