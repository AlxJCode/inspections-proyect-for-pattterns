import { Image } from 'antd';
import React, { useState } from 'react'
import styles from './ImageModal.module.css'

interface ImageModalInterface {
    text: string
    url: string | undefined
}

export const ImageModal = ( {text, url}: ImageModalInterface) => {

    const [visible, setVisible] = useState(false);
    
    return (
        <div style={{display: "inline", maxWidth: "70px", position: "relative" }}>
            <button className={styles.button} onClick={() => setVisible(true)}>{ text }</button>
            <Image
                width={200}
                style={{
                    display: 'none',
                    position:"absolute"
                }}
                src={url}
                preview={{
                    visible,
                    src: `${url}`,
                    mask: null,
                    onVisibleChange: (value) => {
                        setVisible(value);
                    },
                }}
                alt = " "
            />
        </div>
    )
}