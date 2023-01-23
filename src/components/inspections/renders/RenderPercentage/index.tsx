import { Progress } from 'antd';
import React from 'react';

interface Props {
    percent: number;
}

export const RenderPercentage = ({ percent }: Props ) => {
    return (
        <Progress type = "circle" percent = { percent } width = { 50 } />
    )
}
