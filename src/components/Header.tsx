
"use client"

import React, { useEffect, useState } from "react";
import { appLogo, appName } from "@/utils/config";
import { Button, Col, Dropdown, Flex, Grid, Image, Row, theme, Typography } from "antd";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useUserStore } from "@/lib/userStore";
import { Layout, Space, Menu } from "antd";
import { UserOutlined, BankOutlined, PoweroffOutlined, ShoppingFilled, MenuOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";

const { useToken } = theme;
const { Paragraph } = Typography;

const profileMenuItems = [
    {
        key: "account",
        label: (
            <Link rel="noopener noreferrer" href="/">
                <BankOutlined /> Account
            </Link>
        ),
    },
    {
        key: "balance-sheet",
        label: (
            <Link rel="noopener noreferrer" href="/balance-sheet">
                <ShoppingFilled /> My Orders
            </Link>
        ),
    },
    {
        key: "signout",
        label: (
            <Space onClick={() => signOut({ callbackUrl: '/signin' })}>
                <PoweroffOutlined /> Sign out
            </Space>
        ),
    },
];

const HeaderMenu: React.FC = () => {
    const { xs } = Grid.useBreakpoint();
    const { data: session, status } = useSession();
    
    const isLoggedIn = status === 'authenticated' && session?.user.id;
    const { user } = useUserStore((s) => s);
    const { setUser } = useUserStore((s) => s);
    const { reset } = useUserStore((s) => s);
    

    
    useEffect(() => {
        if (status === "loading") return;
        if (session?.user.id ) {
            setUser(session?.user.id);
        } else {
            reset();
        }
    }, [session]);

    const items = [
        {
            key: "profile",
            icon: xs && <UserOutlined />,
            label: (
                <Space>
                    {isLoggedIn ? (
                        <Dropdown menu={{ items: profileMenuItems }}>
                            {xs ? (
                                <Typography>{session?.user.firmname}</Typography>
                            ) : (
                                <UserOutlined />
                            )}
                        </Dropdown>
                    ) : (
                        <Link href="/signin">Signin</Link>
                    )}
                </Space>
            ),
        },
    ];





    return (
        <Flex>
            {session?.user && (
                <Flex vertical justify="center">
                    <p style={{ margin: 0, lineHeight: "normal", padding: 0, fontWeight: "bold", color: "dark", }}>{user?.owner}</p>
                    <p style={{ margin: 0, lineHeight: "normal", padding: 0, fontWeight: "lighter", color: "gray" }}>{user?.firmName}</p>
                </Flex>
            )}
            <Menu
                mode="horizontal"
                items={items}
                style={{
                    display: "flex",
                    flex: xs ? 1 : 1,
                    justifyContent: "end",
                    padding: 0,
                }}
                disabledOverflow
            />
        </Flex>
    );
};

interface HeaderProps {
    toggleDrawer: () => void; // Define the toggleDrawer prop

}

const Header: React.FC<HeaderProps> = ({toggleDrawer}) => {
    const { token: { padding, colorBgContainer } } = useToken();
    const { md } = Grid.useBreakpoint();
    const urlPath = usePathname();
    // const pathItem = urlPath.split('/');
    const excludedPages = ['/signin', '/signup'];

    const hideMenu = excludedPages.includes(urlPath);

    return (
        <Layout.Header
            style={{
                display: "flex",
                width: "100%",
                background: colorBgContainer,
                flexDirection: "column",
                height: 'auto',
                paddingLeft: padding,
                paddingRight: padding,
                // border: "solid 1px red",
                // paddingTop: '0px',
                // paddingBottom: '0px',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000, // Ensure header is on top
            }}
        >
            <Flex align="center" justify="space-between" gap={padding}>
                <Link href="/" style={{ color: "inherit" }}>
                    {md ? (
                        <Typography.Title level={3} style={{ fontWeight: 700, margin: 0 }}>
                            {appName}
                        </Typography.Title>
                    ) : (
                        <Image
                            src={appLogo}
                            alt={appName}
                            width={60}
                            height={60}
                            preview={false}
                        />
                    )}
                </Link>
                {!md && !hideMenu && < Button
                    type="text"
                    onClick={toggleDrawer}
                    style={{ marginLeft: 'auto' }}
                    icon={<MenuOutlined />}
                    /> 
                }
               
                <HeaderMenu />
            </Flex>
        </Layout.Header>
    );
};

export default Header;
