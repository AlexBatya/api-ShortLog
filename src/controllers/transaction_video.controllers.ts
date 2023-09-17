import TransactionServices from '../services/transaction_video.services'

class TransactionContronllers{
    public async addVideo(req: any, res: any){
        if(req.headers.authorization == ''){
            return res
                .status(200)
                .send('Видео добавленно впапку')
            
        }
        else 
            return res
                .status(403)
                .send('Не верный ключ аутентификация')
        
    }
    public async deleteVideo(req: any, res: any){
        if(req.headers.authorization == ''){
            if(req.body.videoName){
                return res 
                    .status(200)
                    .send('Видео отправленно на удаление')
            }
            else 
                return res 
                    .status(404)
                    .send('Видео не найденно')
            
        } 
        else{
            return res
                .status(403)
                .send('Не верный ключ аутентификация')
        }
            
    }
    public async chackVideos(req: any, res: any){
        if(req.headers.authorization == ''){
            if(req.body.dir != '' && req.body.dir != undefined){

                const data = await TransactionServices.chackVideo(req.body.dir)   

                if(data){
                    return res
                        .status(200)
                        .send({data: data})
                }  
                else
                    return res
                        .status(404)
                        .send('Такой папки нет');
                
            }
            else 
                return res
                    .status(404) 
                    .send('Папка не найдена')
        }
        else 
            return res
                .status(403)
                .send('Не верный ключ аутентификация')
    }

}

export default new TransactionContronllers();