

// // "use client";

// // import React from "react";
// // import { App, Breadcrumb, ConfigProvider, Grid, theme } from "antd";
// // import Notify from "@/lib/notify";
// // import { Layout, Menu } from "antd";
// // import Header from "../components/Header";
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation';
// // import { HomeOutlined, UserOutlined } from "@ant-design/icons";
// // import { SessionProvider } from "next-auth/react";

// // const { Content, Sider } = Layout;

// // const { SubMenu } = Menu;

// // export default function Template({ children }: { children: React.ReactNode }) {
// //     const { token: { borderRadiusSM, colorBgContainer, padding } } = theme.useToken();
// //     const { md } = Grid.useBreakpoint();
// //     const urlPath = usePathname();
// //     const path = urlPath.split('/').filter(x => x);

// //     return (
// //         <ConfigProvider
// //             theme={{
// //                 token: {
// //                     borderRadius: borderRadiusSM,
// //                     padding: md ? padding : padding / 2,
// //                 },
// //             }}
// //         >
// //             <App>
// //                 <SessionProvider>
// //                     <Notify />
// //                     <Layout style={{ overflow: "hidden", width: "100%", background: colorBgContainer }}>
// //                         <Header />
// //                         <div style={{ paddingLeft: padding, paddingTop: 64 }}>
// //                             <Layout>
// //                                 <Sider
// //                                     width={md ? 200 : 80} 
// //                                     style={{
// //                                         overflow: 'auto',
// //                                         height: 'calc(100vh - 64px)',
// //                                         position: 'fixed',
// //                                         left: 0,
// //                                         paddingTop: 0 
// //                                     }}
// //                                 >
// //                                     <Menu
// //                                         mode={md ? "inline" : "horizontal"} 
// //                                         defaultSelectedKeys={['1']}
// //                                         defaultOpenKeys={['sub1']}
// //                                         style={{ height: '100%', borderRight: 0 }}
// //                                     >
// //                                         <SubMenu key="sub1" icon={<UserOutlined />} title="Main">
// //                                             <Menu.Item key="1"><Link href="/">Home</Link></Menu.Item>
// //                                             <Menu.Item key="2"><Link href="/bill">Bills</Link></Menu.Item>
// //                                             <Menu.Item key="3"><Link href="/payment">Payments</Link></Menu.Item>
// //                                             <Menu.Item key="4"><Link href="/balance-sheet">Balance Sheet</Link></Menu.Item>
// //                                             <Menu.Item key="5"><Link href="/supplier">Supplier</Link></Menu.Item>
// //                                         </SubMenu>
// //                                     </Menu>
// //                                 </Sider>
// //                                 <Layout style={{ marginLeft: md ? 200 : 80, overflowY: 'auto', paddingTop: md ? 24 : 0, paddingLeft: padding }}>
// //                                     <Breadcrumb style={{ margin: '16px 0' }}>
// //                                         <Breadcrumb.Item>
// //                                             <Link href='/'><HomeOutlined /></Link>
// //                                         </Breadcrumb.Item>
// //                                         {path.map((item, i) => (
// //                                             <Breadcrumb.Item key={i}>
// //                                                 <Link href={`/${item}`}>{item}</Link>
// //                                             </Breadcrumb.Item>
// //                                         ))}
// //                                     </Breadcrumb>
// //                                     <Content
// //                                         className="site-layout-background"
// //                                         style={{
// //                                             padding: 24,
// //                                             margin: 0,
// //                                             minHeight: 'calc(100vh - 64px)',
// //                                         }}
// //                                     >
// //                                         {children}
// //                                     </Content>
// //                                 </Layout>
// //                             </Layout>
// //                         </div>
// //                     </Layout>
// //                 </SessionProvider>
// //             </App>
// //         </ConfigProvider>
// //     );
// // }

// "use client";

// import React, { useState } from "react";
// import { App, Breadcrumb, ConfigProvider, Grid, theme } from "antd";
// import Notify from "@/lib/notify";
// import { Layout, Menu, Drawer, Button } from "antd";
// // import Header from "../components/Header";
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { HomeOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
// import { SessionProvider } from "next-auth/react";
// import Header from "@/components/Header";

// // const { Content } = Layout;

// const { Content, Sider } = Layout;

// const { SubMenu } = Menu;



// export default function Template({ children }: { children: React.ReactNode }) {
//     const { token: { borderRadiusSM, colorBgContainer, padding } } = theme.useToken();
//     const { md } = Grid.useBreakpoint();
//     const urlPath = usePathname();
//     const path = urlPath.split('/').filter(x => x);

//     // State to manage drawer visibility
//     const [drawerVisible, setDrawerVisible] = useState(false);

//     // Function to toggle drawer visibility
//     const toggleDrawer = () => {
//         setDrawerVisible(!drawerVisible);
//     };

//     return (
//         <ConfigProvider
//             theme={{
//                 token: {
//                     borderRadius: borderRadiusSM,
//                     padding: md ? padding : padding / 2,
//                 },
//             }}
//         >
//             <App>
//                 <SessionProvider>
//                     <Notify />
//                     <Layout style={{ overflow: "hidden", width: "100%", background: colorBgContainer }}>
//                         {/* <Header>
//                             {/* Button to toggle drawer */}
//                             {/* <Button
//                                 type="text"
//                                 onClick={toggleDrawer}
//                                 style={{ float: "right", marginRight: 16 }}
//                                 icon={<MenuOutlined />}
//                             /> */}
//                         {/* </Header> */} 
//                         {/* <Header/> */}
//                         <Header toggleDrawer={toggleDrawer} />
//                         <div style={{ paddingTop: 64 }}>
//                             <Layout>
//                                 {/* Sidebar for desktop */}
//                                 {md && (
//                                     <Sider
//                                         width={200}
//                                         style={{
//                                             overflow: 'auto',
//                                             height: 'calc(100vh - 64px)',
//                                             position: 'fixed',
//                                             left: 0,
//                                             paddingTop: 0
//                                         }}
//                                     >
//                                         <Menu
//                                             mode="inline"
//                                             defaultSelectedKeys={['1']}
//                                             defaultOpenKeys={['sub1']}
//                                             style={{ height: '100%', borderRight: 0 }}
//                                         >
//                                             <SubMenu key="sub1" icon={<UserOutlined />} title="Main">
//                                                 <Menu.Item key="1"><Link href="/">Home</Link></Menu.Item>
//                                                 <Menu.Item key="2"><Link href="/bill">Bills</Link></Menu.Item>
//                                                 <Menu.Item key="3"><Link href="/payment">Payments</Link></Menu.Item>
//                                                 <Menu.Item key="4"><Link href="/balance-sheet">Balance Sheet</Link></Menu.Item>
//                                                 <Menu.Item key="5"><Link href="/supplier">Supplier</Link></Menu.Item>
//                                             </SubMenu>
//                                         </Menu>
//                                     </Sider>
//                                 )}

//                                 {/* Drawer for mobile */}
//                                 {!md && (
//                                     <Drawer
//                                         title="Menu"
//                                         placement="left"
//                                         closable={true}
//                                         onClose={toggleDrawer}
//                                         visible={drawerVisible}
//                                         key="left"
//                                     >
//                                         <Menu
//                                             mode="inline"
//                                             defaultSelectedKeys={['1']}
//                                             defaultOpenKeys={['sub1']}
//                                         >
//                                             <SubMenu key="sub1" icon={<UserOutlined />} title="Main">
//                                                 <Menu.Item key="1"><Link href="/">Home</Link></Menu.Item>
//                                                 <Menu.Item key="2"><Link href="/bill">Bills</Link></Menu.Item>
//                                                 <Menu.Item key="3"><Link href="/payment">Payments</Link></Menu.Item>
//                                                 <Menu.Item key="4"><Link href="/balance-sheet">Balance Sheet</Link></Menu.Item>
//                                                 <Menu.Item key="5"><Link href="/supplier">Supplier</Link></Menu.Item>
//                                             </SubMenu>
//                                         </Menu>
//                                     </Drawer>
//                                 )}

//                                 <Layout style={{ marginLeft: md ? 200 : 0, overflowY: 'auto', paddingTop: md ? 24 : 0, paddingLeft: padding }}>
//                                     <Breadcrumb style={{ margin: '16px 0' }}>
//                                         <Breadcrumb.Item>
//                                             <Link href='/'><HomeOutlined /></Link>
//                                         </Breadcrumb.Item>
//                                         {path.map((item, i) => (
//                                             <Breadcrumb.Item key={i}>
//                                                 <Link href={`/${item}`}>{item}</Link>
//                                             </Breadcrumb.Item>
//                                         ))}
//                                     </Breadcrumb>
//                                     <Content
//                                         className="site-layout-background"
//                                         style={{
//                                             padding: 24,
//                                             margin: 0,
//                                             minHeight: 'calc(100vh - 64px)',
//                                         }}
//                                     >
//                                         {children}
//                                     </Content>
//                                 </Layout>
//                             </Layout>
//                         </div>
//                     </Layout>
//                 </SessionProvider>
//             </App>
//         </ConfigProvider>
//     );
// }


"use client";

import React, { useState } from "react";
import { App, Breadcrumb, ConfigProvider, Grid, theme } from "antd";
import Notify from "@/lib/notify";
import { Layout, Menu, Drawer } from "antd";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

export default function Template({ children }: { children: React.ReactNode }) {
    const { token: { borderRadiusSM, colorBgContainer, padding } } = theme.useToken();
    const { md } = Grid.useBreakpoint();
    const urlPath = usePathname();
    const path = urlPath.split('/').filter(x => x);

    // State to manage drawer visibility
    const [drawerVisible, setDrawerVisible] = useState(false);

    // Function to toggle drawer visibility
    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    borderRadius: borderRadiusSM,
                    padding: md ? padding : padding / 2,
                },
            }}
        >
            <App>
                <SessionProvider>
                    <Notify />
                    <Layout style={{ overflow: "hidden", width: "100%", background: colorBgContainer }}>
                        <Header toggleDrawer={toggleDrawer} />
                        <div style={{ paddingTop: 64 }}>
                            <Layout>
                                {/* Sidebar for desktop */}
                                {md && (
                                    <Sider
                                        width={200}
                                        style={{
                                            overflow: 'auto',
                                            height: 'calc(100vh - 64px)',
                                            position: 'fixed',
                                            left: 0,
                                            paddingTop: 0
                                        }}
                                    >
                                        <Menu
                                            mode="inline"
                                            defaultSelectedKeys={['1']}
                                            defaultOpenKeys={['sub1']}
                                            style={{ height: '100%', borderRight: 0 }}
                                        >
                                            <SubMenu key="sub1" icon={<UserOutlined />} title="Main">
                                                <Menu.Item key="1"><Link href="/">Home</Link></Menu.Item>
                                                <Menu.Item key="2"><Link href="/bill">Bills</Link></Menu.Item>
                                                <Menu.Item key="3"><Link href="/payment">Payments</Link></Menu.Item>
                                                <Menu.Item key="4"><Link href="/balance-sheet">Balance Sheet</Link></Menu.Item>
                                                <Menu.Item key="5"><Link href="/supplier">Supplier</Link></Menu.Item>
                                            </SubMenu>
                                        </Menu>
                                    </Sider>
                                )}

                                {/* Drawer for mobile */}
                                {!md && (
                                    <Drawer
                                        title="Menu"
                                        placement="left"
                                        closable={true}
                                        onClose={toggleDrawer}
                                        visible={drawerVisible}
                                        key="left"
                                    >
                                        <Menu
                                            mode="inline"
                                            defaultSelectedKeys={['1']}
                                            defaultOpenKeys={['sub1']}
                                        >
                                            <SubMenu key="sub1" icon={<UserOutlined />} title="Main">
                                                <Menu.Item key="1"><Link href="/">Home</Link></Menu.Item>
                                                <Menu.Item key="2"><Link href="/bill">Bills</Link></Menu.Item>
                                                <Menu.Item key="3"><Link href="/payment">Payments</Link></Menu.Item>
                                                <Menu.Item key="4"><Link href="/balance-sheet">Balance Sheet</Link></Menu.Item>
                                                <Menu.Item key="5"><Link href="/supplier">Supplier</Link></Menu.Item>
                                            </SubMenu>
                                        </Menu>
                                    </Drawer>
                                )}

                                <Layout style={{ marginLeft: md ? 200 : 0, overflowY: 'auto', paddingTop: md ? 24 : 0, paddingLeft: padding }}>
                                    <Breadcrumb style={{ margin: '16px 0' }}>
                                        <Breadcrumb.Item>
                                            <Link href='/'><HomeOutlined /></Link>
                                        </Breadcrumb.Item>
                                        {path.map((item, i) => (
                                            <Breadcrumb.Item key={i}>
                                                <Link href={`/${item}`}>{item}</Link>
                                            </Breadcrumb.Item>
                                        ))}
                                    </Breadcrumb>
                                    <Content
                                        className="site-layout-background"
                                        style={{
                                            padding: 24,
                                            margin: 0,
                                            minHeight: 'calc(100vh - 64px)',
                                        }}
                                    >
                                        {children}
                                    </Content>
                                </Layout>
                            </Layout>
                        </div>
                    </Layout>
                </SessionProvider>
            </App>
        </ConfigProvider>
    );
}
