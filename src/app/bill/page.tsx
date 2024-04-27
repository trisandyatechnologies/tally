



"use client";

import React, { useState, useEffect } from 'react';
// import GoodsSupplierSelect from '@/components/GoodsSupplierSelect';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, redirect } from 'next/navigation';
import { Button, Spin, Card } from 'antd';
// import { GoodsSupplier } from '@prisma/client';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';
// import SelectCategory from '@/components/SelectCategory';
// import { useBillsStore } from '@/lib/useBillsStore';
// import TabbedPanel from '@/components/TabbedPanel';

const BillPage: React.FC = () => {
    const [supplier, setSupplier] = useState<string>();

    const { data: session, status } = useSession();


    const [userId, setUserId] = useState<string>( status === 'authenticated' ? session?.user?.id : '');

    if (status === 'unauthenticated') {
        redirect('/signin');
    }

    const handleSupplierSelect = (supplier: string) => {
        setSupplier(supplier);
    };


    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 25,
    };

    const elementStyle: React.CSSProperties = {
        margin: '10px auto',
        width: '100%',
        maxWidth: '500px',
        borderRadius: 25,
    };

    const loaderStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(-50%,-50%)'

    };
    if (status === "loading") {
        return <div style={loaderStyle}><Spin size="large" tip="Loading..." /></div>;
    }

    const wrapperStyle: React.CSSProperties = {
        margin: '17px auto'
    }





    return (
        <>
            <div style={wrapperStyle}>
                <div style={containerStyle}>
                    <Card title="Get all your bills instantly" style={elementStyle}>

                        <Link href={{ pathname: "/bill/new" }} passHref>
                            <Button type="primary" icon={<PlusOutlined />} style={elementStyle}>Add a Bill</Button>
                        </Link>
                        <Link href={{ pathname: "/bill/view" }} passHref>
                            <Button icon={<EyeOutlined />} style={elementStyle}>View Bills</Button>
                        </Link>
                    </Card>
                </div>
            </div>
        </>

    );
};

export default BillPage;