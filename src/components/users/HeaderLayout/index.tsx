import { Header } from 'antd/lib/layout/layout'
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import { UserDrawer } from '../UserDrawer';
import useWindowSize from '../../../hooks/utils/useWindowSize';
import { Avatar, Space, Tooltip } from 'antd';

import styles from './Header.module.css';
import logo from '../../../../public/images/logo-igh-vertical.png';
import whitelogo from '../../../../public/images/logo-igh-white-square.png';
import userPhoto from '../../../../public/images/user.png';
import { AuthContext } from '../../../context';
import { useAxiosUser } from '../../../hooks/users/useAxiosUser';
//import { useAxiosUsers } from '../../../hooks/users/useAxiosUsers';

const userSettingsTitle = 'Opciones del usuario';

interface Props {
    withImage   ?: boolean;
    transparent ?: boolean;
}

export const HeaderLayout =  ({ withImage = true, transparent = false }: Props ) => {

    const { width } = useWindowSize();
    const { users, getFiltered, loading } = useAxiosUser();
    const { user } = useContext( AuthContext );
    const [ openDrawer, setOpenDrawer ] = useState( false );

    const onOpenDrawer = () => {
        setOpenDrawer( true );
    }

    useEffect(() => {
        if ( user && user.id ) getFiltered( { filter: { id: user.id } });
    }, [ user ]);
    

    return (
        <Header className={styles.headerContainer} style = {{ backgroundColor: transparent ? "transparent": "var(--main-color)" }}>
            {
                withImage && (
                    <div className={styles.headerLeft}>
                        { width > 528 ? (
                            <Image src={logo} height={40} width={230} alt="igh"/>
                        ) : (
                            <Image src={whitelogo} height={40} width={50} alt="igh"/>
                        )}
                    </div>
                )
            }
            <div className={styles.headerRight}>
                <div className={styles.containerUserSettings}>
                    <Tooltip title={userSettingsTitle}>
                        <Space size={16} className={styles.spaceUserSettings} onClick={onOpenDrawer}>
                            <Avatar
                                size="large"
                                src={<Image src={ userPhoto } height={40} width={40} objectFit="cover" alt=''/>}
                            />
                            { width > 678 && (
                                <div className={styles.username}>
                                    <span>{ users[0]?.name } { users[0]?.firstLastName }</span>
                                </div>
                            ) }
                        </Space>
                    </Tooltip>
                    <UserDrawer
                        openDrawer={openDrawer}
                        setOpenDrawer={setOpenDrawer}
                        user = { users[0] }
                    />
                </div>
            </div>
        </Header>
    )
}
