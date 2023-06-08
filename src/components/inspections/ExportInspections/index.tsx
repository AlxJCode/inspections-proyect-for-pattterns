import { FileExcelOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React from 'react';
import { IInspection } from '../../../interfaces/inspections/inspection';
import { writeExcel } from '../../../helpers/excel/write-excel';
import { inspectionColumn } from '../../../utils/columns/inspections';

interface Props {
    inspections : IInspection[];
    loading     : boolean;
}

export const ExportInspections = ({ inspections, loading }: Props) => {

    const onClick = async () => {
        try {
            await writeExcel(inspections, inspectionColumn);
        } catch (error) {
            console.log(error);
            message.error("Ocurrió un error al descargar reporte.")
        }
    };

    return (
        <div>
            <Button
                type = 'primary'
                icon = {<FileExcelOutlined/>}
                loading = { loading }
                onClick = {() => onClick()}
            >

            </Button>
        </div>
    )
};
