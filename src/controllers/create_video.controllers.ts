import createVideoServices from "../services/create_video.services";

class CreateVideoController{
    public async createAllVideos(req: any, res: any) {
        if(req.headers.authorization == ''){
            if(req.body.dirIn && req.body.dirOut && req.body.parts && req.body.shortTime){
                const info = await createVideoServices.createAllVideos(req.body);
                return res
                    .status(200)
                    .send({data: info})
            }
            else 
                return res
                    .status(404)
                    .send('Не верные параметры запроса')
        }
        else
            return res 
                .status(403)
                .send('Не верный ключ')
    }
}

export default new CreateVideoController();