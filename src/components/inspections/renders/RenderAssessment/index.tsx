import { Tag } from 'antd';
import React from 'react';

interface Props {
    assessment: "Alto" | "Medio" | "Bajo" | string;
}

export const RenderAssessment = ({ assessment }: Props ) => {

    console.log( "ASD", assessment );
    switch ( assessment)  {
        case 'Alto':
            
            return <Tag color = "error"  >{ assessment.toUpperCase() }</Tag>

        case 'Medio':
            
            return <Tag color = "gold" >{ assessment.toUpperCase() }</Tag>

        case 'Bajo':
            
            return <Tag color = "success" >{ assessment.toUpperCase() }</Tag>
    
        default:
            return <></>
    }
}
