import React from 'react';
import styles from './Loader.module.css';

export const Loader = () => {
    return (
        <div className={styles.loaderBg}>
            {/* <Image src={"/images/logo-small.png"} width={250} height={250} /> */}
            <div className={styles.loadingioSpinnerEllipsis1uoryb8dmf}>
                <div className={styles.ldioGl0cdat9xl5}>
                    <div></div><div></div><div></div><div></div><div></div>
                </div>
            </div>
        </div>
    )
}
