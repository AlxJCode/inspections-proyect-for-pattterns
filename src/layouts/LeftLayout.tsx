import { CalendarOutlined, FileSearchOutlined, FolderOutlined, GlobalOutlined, HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context";
import useWindowSize from "../hooks/utils/useWindowSize";
import styles from "../styles/layouts/LeftLayout.module.css";
import logo from '../../public/images/logo-igh-large.png';
import { HeaderLayout } from "../components/users/HeaderLayout";
import { useRouter } from "next/router";
import Head from "next/head";
import { ItemType } from "antd/lib/menu/hooks/useItems";

interface Props {
    submenu     ?: string;
	selectedKey ?: number;
	children    : React.ReactNode;
	title       ?: string;
};

const getItem = (
    label   ?: React.ReactNode,
    key     ?: string,
    icon    ?: React.ReactNode,
    children?: Array<any>,
    type    ?: any
) => {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
};

const itemsAdmin:ItemType[] = [
	getItem("Inicio", "1", <HomeOutlined />),
	getItem("Inspecciones", "2", <CalendarOutlined />),
    getItem("Gestión", "sub1", <GlobalOutlined />, [
        getItem('Usuarios', '3'),
        getItem('Áreas', '4'),
        getItem('Empresas', '5'),
      ]),
];

const itemsWorker = [
	getItem("Inicio", "1", <HomeOutlined />),
	getItem("Inspecciones", "2", <CalendarOutlined />),
];

const appName = "Inspecciones";

export const LeftLayout = ({ submenu = "", selectedKey = 1, children, title }: Props) => {

    const { user } = useContext( AuthContext );
	const { Sider, Header, Content } = Layout;
	const [collapsed, setCollapsed] = useState( false );
	const { width } = useWindowSize();
    const router = useRouter();

    const switchUser = ( type:string ) => {
        switch  ( type )  {
            case "SA":
                return itemsAdmin
            case "AD":
                return itemsWorker
            case "ST":
                return itemsWorker
            case "T":
                return itemsWorker
            default:
                return itemsWorker
        }
    }

    const onClickMenu = ( key : string ) => {
        if  ( width < 768 ) {
          setCollapsed( true );
        }
    
        switch ( key ) {
            case "1":
                router.push('/');
                break;
            case "2":
                router.push('/inspections/');
                break;
            case "3":
                router.push('/users/');
                break;
            case "4":
                router.push('/users/areas');
                break;
            case "5":
                router.push('/users/companies');
                break;
            case "6":
                router.push('/');
                break;
        
            default:
                router.push('/');
                break;
        }
    
    };

	return (
		<div>
            <Head>
                { title ? (
                    <title>{` ${ title } | ${ appName } `}</title>
                ) : (
                    <title> { appName } </title>
                )}
            </Head>
			<Layout style = {{ minHeight: "100vh", position: "relative" }}>
				<Sider
					trigger         = { null }
					collapsible
					collapsed       = { collapsed }
					collapsedWidth  = { width < 768 ? 0 : 80 }
                    theme           = "dark"
                    className       = { styles.sider }
				>
					<div
						className   ={ styles.logoSider }
						style       ={{ padding: collapsed ? "1rem .25rem" : "1rem" }}
					>
						<Image
							src     = { logo }
							width   = { 170 }
							height  = { 70 }
                            alt     = ""
						/>
					</div>
					<Menu
                        defaultOpenKeys     = {[`${submenu}`]}
						onClick             = { ( props ) => onClickMenu( props.key ) }
						theme               = "dark"
						mode                = "inline"
						defaultSelectedKeys = {[`${selectedKey}`]}
						items               = { ( user && user.type ) ? switchUser( user.type ) : itemsWorker }
					/>
				</Sider>
                <Layout style = {{ position: "relative" }}>
                    <Header style={{ padding: width < 768 ? "0 1rem" : "0 3rem" }} className = { styles.top }>
                        <div className={styles.header}>
                            {
                                collapsed ?
                                (
                                    <Button type='primary' icon={<MenuUnfoldOutlined />} onClick={() => setCollapsed(!collapsed)}></Button>
                                ) : (
                                    <Button type='primary' icon={<MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)}></Button>
                                )
                            }
                            <HeaderLayout withImage = { false } transparent = { true }/>
                        </div>
                    </Header>
                    <Content style={{ display: width < 768 && !collapsed ? "none" : "block" }} className={styles.generalLayoutContent}>
                        { children }
                    </Content>
                </Layout>
			</Layout>
		</div>
	);
};
