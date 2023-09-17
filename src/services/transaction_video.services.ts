import fs from 'fs';

class TransactionServices{
    public chackVideo(dir: string){ 
        return new Promise((res: any) => {
            fs.readdir('./data/' + dir, (err: any, data: any) => {
                if(err){
                    return res(false)
                }
                return res(data)
            })
        })
    }
}

export default new TransactionServices()