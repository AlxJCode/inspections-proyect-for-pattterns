import React from 'react';

interface Props {
    state: "" | string;
}

export const RenderStatus = ({ state }: Props ) => {
    switch ( state ) {
        case "0":
            return <div style = {{ fontWeight: "600" }}>Pendiente</div>;
        case "1":
            return <div style = {{ fontWeight: "600" }}>Rechazado</div>;
        case "2":
            return <div style = {{ fontWeight: "600" }}>Aceptado</div>;
    
        default:
            return <></>;
    }
}
