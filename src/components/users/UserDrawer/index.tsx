import { LogoutOutlined, SolutionOutlined, SwapRightOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import Image from 'next/image';
import { Dispatch, SetStateAction, useContext } from 'react';

import styles from './UserDrawer.module.css';
import photo from '../../../../public/images/user.png';
import { AuthContext } from '../../../context';
import { useRouter } from 'next/router';
import { IUserDetail } from '../../../interfaces/users/user';

type UserDrawerProps = {
    openDrawer      : boolean
    setOpenDrawer   : Dispatch<SetStateAction<boolean>>
    user            ?: IUserDetail
}

export const UserDrawer = ({ openDrawer, setOpenDrawer, user }: UserDrawerProps) => {

    const { logout } = useContext(AuthContext);
    const router = useRouter();

    const onLogout = () => {
        setOpenDrawer(false);
        logout();
    };

    const onViewProfile = () => {
        if ( !user ) return;
        setOpenDrawer(false);
        //router.push(`/users/edit/${user.id}`);
    };


    return (
        <Drawer
            placement='right'
            open={openDrawer}
            closable={false}
            headerStyle={{ display: 'none' }}
            onClose={() => setOpenDrawer(false)}
            width={300}
        >
            <div className={styles.drawerContainer}>
                <div className={styles.drawerHeader}>
                    <Button type='primary' onClick={() => setOpenDrawer( false )}>
                        <SwapRightOutlined />
                    </Button>
                </div>
                <div className={styles.drawerBody}>
                    <div className={styles.info}>
                        <div className={styles.image}>
                            <Image src={ photo } objectFit="cover" alt = "" width={240} height={240} style={{ borderRadius: "50%" }} />
                        </div>
                        <span className={styles.name}>
                            { user?.name } { user?.firstLastName }
                        </span>
                        {/* <span className={styles.position}>
                            { user?.positionModel?.name }
                        </span> */}
                        <span className={styles.area}>
                        { user?.areaModel?.name }
                        </span>
                    </div>
                    <div className={styles.menu}>
                        <Button size="large" icon={<UserOutlined />} onClick={ onViewProfile }>
                            Ver perfil
                        </Button>
                        <Button size="large" icon={<LogoutOutlined />} onClick={ onLogout }>
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}
