"use client";


// Bills.tsx
import React, { useState, useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { Table, Space, Select, DatePicker, Button, Typography, Spin } from 'antd';
import GoodsSupplierSelect from '@/components/GoodsSupplierSelect';
import moment from 'moment';
import { useBillsStore } from '@/lib/useBillsStore';
import { useGoodsStore } from '@/lib/useGoodsStore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Bills: React.FC = () => {

    const { data: session, status } = useSession();
    const [userIdFromSession, setUserIdFromSession] = useState<string>(status === 'authenticated' ? session?.user?.id : '');
    if (status === 'unauthenticated') {
        redirect('/signin');
    }

    

    const searchParams = useSearchParams();
    const userId = searchParams.get('userId') as string;
    const [billTypeFilter, setBillTypeFilter] = useState<string | undefined>();
    const [dateFilter, setDateFilter] = useState<string | undefined>();
    const [supplierFilter, setSupplierFilter] = useState<string | undefined>();
    const [loading, setLoading] = useState(true); 

    const billsFromStore = useBillsStore(state => state.bills);
    const goodsFromStore = useGoodsStore(state => state.goods);

    const fetchBills = useBillsStore(state => state.fetchBills);
    const fetchGoods = useGoodsStore(state => state.setGoods);

    
    const filteredBills = billsFromStore.filter(bill => {
        if (billTypeFilter && bill.type !== billTypeFilter) return false;
        if (dateFilter) {
            const billDate = moment.utc(bill.date).startOf('day');
            const selectedDate = moment.utc(dateFilter).startOf('day');
            if (!billDate.isSame(selectedDate)) return false;
        }
        if (supplierFilter && bill.goodsSupplierId !== supplierFilter) return false;
        return true;
    });

    

    useEffect(() => {
        setLoading(true);
        fetchGoods();
        fetchBills().
            finally(() => setLoading(false));
    }, []);

    const handleSupplierSelect = (supplier: string) => {
        setSupplierFilter(supplier);
    };

    const loaderStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(-50%,-50%)'
    };

    const resetFilters = () => {
        setBillTypeFilter(undefined);
        setDateFilter(undefined);
        setSupplierFilter(undefined);
    };

    return (
        <div style={{ padding: '1rem', margin: '1rem' }}>
            {loading ? (
                <Spin size="large" style={loaderStyle} />
            ) : (
                <>
                    <Space style={{ marginBottom: 16 }}>
                        <GoodsSupplierSelect  onSupplierSelect={handleSupplierSelect} />
                        <Select
                            placeholder="Bill Type"
                            value={billTypeFilter}
                            onChange={value => setBillTypeFilter(value)}
                            allowClear
                        >
                            <Select.Option value="GST">GST</Select.Option>
                            <Select.Option value="NON_GST">Non-GST</Select.Option>
                        </Select>


                            <DatePicker
                                onChange={date => {
                                    if (date) {
                                        const formattedDate = moment(date.toDate()).format('DD-MMM-YYYY');
                                        // console.log("This is formattedDate", formattedDate);
                                        setDateFilter(formattedDate);
                                    } else {
                                        setDateFilter(undefined); // If date is null or undefined, reset the filter
                                    }
                                }}
                                allowClear
                            />



                        <Button onClick={resetFilters}>Reset Filters</Button>
                        <Button style={{background:"skyblue", color:'black', fontWeight:'bold'}}><Link href="/supplier">Add a New Supplier</Link></Button>
                        
                        
                    </Space>
                        <Table dataSource={filteredBills} style={{ margin: '1rem' }} scroll={{ x: 'max-content', y: 240 }}>
                        <Table.Column title="Serial Name" dataIndex="serialName" key="serialName" />
                        <Table.Column title="Name" dataIndex="name" key="name" />
                        <Table.Column title="Date" dataIndex="formattedDate" key="date" /> 
                        <Table.Column title="Amount" dataIndex="amount" key="amount" />
                        <Table.Column title="Type" dataIndex="type" key="type" />
                        <Table.Column title="Goods Supplier" dataIndex="goodsSupplierName" key="goodsSupplierName" />
                    </Table>
                </>
            )}
        </div>
    );
};

export default Bills;
