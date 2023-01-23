import { Button, Space } from 'antd';
import React, { useContext } from 'react';
import useWindowSize from '../../../hooks/utils/useWindowSize';
import { IButtonProps } from '../../../interfaces/utils';
import styles from './ViewHeaderWithButtons.module.css';

interface ViewHeaderWithButtonsProps {
    title: string;
    buttons?: IButtonProps[];
}

export const ViewHeader = ({ title, buttons }: ViewHeaderWithButtonsProps) => {

    const { width } = useWindowSize();

    return (
        <div className={styles.container} style={ buttons ? {} : {justifyContent: "center"} }>
            <div className={styles.title}>
                <h3>{ title }</h3>
            </div>
            {
                buttons && (
                    <div className={styles.buttons}>
                        <Space wrap>
                            {
                                buttons.map(({ content, icon, shape, onClick }) => (
                                    <Button
                                        icon={icon}
                                        onClick={onClick}
                                        shape={shape}
                                        key={content}
                                        size={width < 768 ? "middle" : "large"}
                                    >
                                        {content}
                                    </Button>
                                ))
                            }
                        </Space>
                    </div>
                )
            }
        </div>
    )
}
