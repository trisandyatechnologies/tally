

"use client";
import React from "react";
import type { TableColumnsType } from "antd";
import {
    Card,
    Col,
    Divider,
    Flex,
    Row,
    Space,
    Typography,
    theme,
    Image,
    Grid,
    Table,
} from "antd";

export default function Home() {
    interface DataType {
        key: React.Key;
        id: number;
        name: string;
        quantity: number;
        price: number;
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: "Item Id",
            dataIndex: "id",
        },
        {
            title: "Item Name",
            dataIndex: "name",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
        },
        {
            title: "Price",
            dataIndex: "price",
        },
    ];

    const data: DataType[] = [
        {
            key: "1",
            id: 1,
            name: "John Brown",
            quantity: 32,
            price: 10,
        },
        {
            key: "2",
            id: 2,
            name: "Jim Green",
            quantity: 42,
            price: 20,
        },
        {
            key: "3",
            id: 3,
            name: "Joe Black",
            quantity: 32,
            price: 30,
        },
    ];

    const {
        token: { padding },
    } = theme.useToken();
    return (
        <>
            <>
                <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                >
                    <Col span={8} lg={10} xs={24}>
                        <Card bordered={false}>
                            <Typography.Title level={3}>
                                <>Shop Name </> :- abc Groceries
                            </Typography.Title>
                            <Typography.Title level={3}>
                                <>Address </> :- abc
                            </Typography.Title>
                            <Typography.Title level={3}>
                                <>Contact </> :- 9876543210
                            </Typography.Title>
                        </Card>
                    </Col>

                    <Col span={8} lg={10} xs={24}>
                        <Card bordered={false}>
                            <Typography.Title level={3}>
                                GST Number :- abc1234
                            </Typography.Title>
                            <Typography.Title level={3}>
                                <>E Mail Address </> :- example@gmail.com
                            </Typography.Title>
                            <Typography.Title level={3}>
                                <> Website </> :- example@abc.com
                            </Typography.Title>
                        </Card>
                    </Col>
                </Row>
            </>
            <>
                <Row>
                    <Col span={12}>
                        {" "}
                        <Image src="https://static.vecteezy.com/system/resources/previews/011/787/631/non_2x/growing-profit-graph-free-png.png" />
                    </Col>
                    <Col span={5}></Col>
                    <Col span={4}>
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVz-IuTNdLVs2tztiB-lehkSvIIUXBr9gz5YTpUGjPWg&s" />
                    </Col>
                </Row>
            </>
            <>
                <>
                    <Divider>Last Orders</Divider>
                    <Table columns={columns} dataSource={data} size="middle" />
                </>
            </>
        </>
    );
}

interface DataType {
    key: React.Key;
    id: number;
    name: string;
    quantity: number;
    price: number;
}

const columns: TableColumnsType<DataType> = [
    {
        title: "Item Id",
        dataIndex: "id",
    },
    {
        title: "Item Name",
        dataIndex: "name",
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
    },
    {
        title: "Price",
        dataIndex: "price",
    },
];

const data: DataType[] = [
    {
        key: "1",
        id: 1,
        name: "John Brown",
        quantity: 32,
        price: 10,
    },
    {
        key: "2",
        id: 2,
        name: "Jim Green",
        quantity: 42,
        price: 20,
    },
    {
        key: "3",
        id: 3,
        name: "Joe Black",
        quantity: 32,
        price: 30,
    },
];

const Tabl: React.FC = () => (
    <>
        <Divider>Last Orders</Divider>
        <Table columns={columns} dataSource={data} size="middle" />
    </>
);