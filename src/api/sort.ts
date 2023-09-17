import fs from 'fs';
import path from 'path';

export default class SortMethods{


    public sortJS(array: any[]){
        var mapped = array.map(function (el: any) {
            return { name: el, value: Number(path.basename(el, path.extname(el))) };
        });

            // сортируем массив, содержащий уменьшенные значения
        mapped.sort((a: any, b: any) => {
            return a.value - b.value
        });

        return mapped.map((el: any) => el.name)

    }
    public bbl(array: any[]){
        var mapped: any = array.map((el: any) => Number(path.basename(el, path.extname(el))))

        for (var i = 0; i < mapped.length; i++) {
  
            for (var j = 0; j < (mapped.length - i - 1); j++) {
    
                if (mapped[j] > mapped[j + 1]) {
    
                    var temp = mapped[j]
                    mapped[j] = mapped[j + 1]
                    mapped[j + 1] = temp
                }
            }
        }

        return mapped.map((el: any) => `${el}`+ '.mp4')
    }
     
    public selectionSort(array: any){
        var mapped: any = array.map((el: any) => Number(path.basename(el, path.extname(el))))

        let n = mapped.length;
        
        for(let i = 0; i < n; i++) {
            // Finding the smallest number in the subarray
            let min = i;
            for(let j = i+1; j < n; j++){
                if(mapped[j] < mapped[min]) {
                    min=j; 
                }
            }
            if (min != i) {
                // Swapping the elements
                let tmp = mapped[i]; 
                mapped[i] = mapped[min];
                mapped[min] = tmp;      
            }
        }

        return mapped.map((el: any) => `${el}` + '.mp4')
    }
}