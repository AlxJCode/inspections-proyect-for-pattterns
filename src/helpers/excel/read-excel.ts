//@ts-ignore
import * as XLSX from 'xlsx/xlsx.mjs';

export const readExcel = (file:File) => {

    const promise = new Promise<[]>((resolve, reject)=> {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e:ProgressEvent<FileReader>) => {
            const bufferArray = e.target?.result;
            
            const wb = XLSX.read(bufferArray, {type: "buffer"});
            const wsName = wb.SheetNames[0];
            const ws = wb.Sheets[wsName];
            const data = XLSX.utils.sheet_to_json(ws);
            resolve(data);
        };
        fileReader.onerror = (e:ProgressEvent<FileReader>) => {
            reject([]);
            console.log(e);
        }

    });

    return promise

}