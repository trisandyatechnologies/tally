

import React from "react";
import { Tabs } from "antd";
import Link from "next/link";
import Home from "./Home";
import BillPage from "./BillComponent";

const { TabPane } = Tabs;

const TabbedPanel = () => {
    return (
        <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane tab={<Link href="/">Home</Link>} key="1">
                {/* <Home /> */}
            </TabPane>
            <TabPane tab={<Link href="/supplier">Goods Provider</Link>} key="2">
                
            </TabPane>
            <TabPane tab={<Link href="/bill">Bills</Link>} key="3">
                {/* <BillPage /> */}
            </TabPane>
            <TabPane tab={<Link href="/payment">Payment Entry</Link>} key="4">
                
            </TabPane>
            <TabPane tab={<Link href="/balance-sheet">Balance Sheet</Link>} key="5">
                
            </TabPane>
        </Tabs>
    );
};

export default TabbedPanel;
