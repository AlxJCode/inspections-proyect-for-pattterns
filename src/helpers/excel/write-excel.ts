//@ts-ignore
import * as XLSX from 'xlsx/xlsx.mjs';

export interface IHeaderExcel {
    label: string;
    value: string;
}

export const writeExcel = ( data:any[], headers:IHeaderExcel[] ) => {

    const promise = new Promise<boolean>((resolve, reject)=> {

        const newData = data.map( (row, index)=> {
            const obj:any= {};
            obj["N"] = index + 1;
            for (const key of headers) {
                obj[key.label] = row[key.value];
            }
            return obj;
        });
        
        try {
            const ws = XLSX.utils.json_to_sheet( newData );
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Data");
            XLSX.writeFileXLSX(wb, "data.xlsx");
            resolve( true );
        } catch ( error ) {
            reject( false );
            console.log( "error", error );
        }

    });

    return promise

}