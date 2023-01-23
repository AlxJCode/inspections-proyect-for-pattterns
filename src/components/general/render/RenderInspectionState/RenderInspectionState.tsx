import React from 'react';
interface Props {
    state: string;
}

export const RenderInspectionState = ( { state }: Props ) => {
    switch ( state ) {
        case "0":
            return "Desactivado";
        case "1":
            return "Activado";
    
        default:
            return "Desactivado";
    }
}
