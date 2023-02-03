import { Result } from 'antd';
import React from 'react';

interface Props {
    msg: string;
}

export const RenderStatusIO = ({ msg }: Props) => {
    return (
        <Result
            status = "success"
            title = { msg }
        />
    )
}
