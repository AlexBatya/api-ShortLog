const fs = require('fs');
const path = require('path');
const color = require('colors');
var ffmpeg = require("fluent-ffmpeg");

import SortMethods from "./sort";

export default class Gluing{
    public cutVideo(dir: string, videoLink: string, toVideoLink: string, startTime: number, shortTime: number){
        return new Promise((res: any) => {
            ffmpeg({source: videoLink + '.mp4'})
            .noAudio()
            .setStartTime(startTime)
            .duration(shortTime)
            .on('start', () => {
                console.log(color.gray('Идёт обработка...'))
            })
            .on('error', (err: any) => {
                console.log(color.red('error' + err))
            })
            .on('end', () =>{
                console.log(color.green('Обработка оконченна'))
                res();
            })
            .saveToFile(dir + toVideoLink + '.mp4')
        })
    }

    public merge(dir: string, endVideoName: string, tmp: string){
        return new Promise((res: any) => {
            const videoNames: string[] = fs.readdirSync(dir);

            const sortMethods = new SortMethods();
            const sortVideoNames: string[] = sortMethods.bbl(videoNames)

            var mergedVideo = ffmpeg();
            for(let i = 1; i < sortVideoNames.length - 1; i++){
                console.log(dir + sortVideoNames[i]) //!
                mergedVideo = mergedVideo.addInput(dir + sortVideoNames[i]);
            }
            mergedVideo
                .mergeToFile(endVideoName + '.mp4', tmp)
                .on('error', function(err: any) {
                    console.log('Error ' + err.message);
                })
                .on('end', function() {
                    console.log(color.green('short Готов'));
                    res();
                });
            })
    }

    timeVideo(videoLink: string){
        return new Promise(async (res: any) => {
            ffmpeg
            .ffprobe(videoLink + '.mp4', function(err: any, metadata: any) {
                res(Math.round(metadata.format.duration))
            });    
        })
    };

    equalPartsTime(parts: number, timeAll: number): number{
        return Math.floor(timeAll / parts)
    };

    deleteShortVideos(dir: string){
        return new Promise((res: any) => {
            const files = fs.readdirSync(dir);
            for(let elem of files){
                fs.unlinkSync(dir + elem)
                res();
            }
        })
    }

}