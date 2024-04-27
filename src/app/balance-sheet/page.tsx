
"use client"

import React, { useEffect, useState } from "react";
import { DatePickerProps, Flex, Select, Table, Tag, Spin } from "antd";
import { Typography } from "antd";
import { DatePicker } from "antd";
import GoodsSupplierSelect from "@/components/GoodsSupplierSelect";
import { useBillsStore } from "@/lib/useBillsStore";
import { useGoodsStore } from "@/lib/useGoodsStore";
import { usePaymentStore } from "@/lib/paymentStore";
import { RangePickerProps } from "antd/es/date-picker";
import { format } from 'date-fns';
import { useSession } from "next-auth/react";
import { redirect} from 'next/navigation';

const { RangePicker } = DatePicker;

const BalanceSheet: React.FC = () => {

    const [filteredDate, setFilteredDate] = useState<string[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [supplier, setSupplier] = useState<string>("");


    const billsFromStore = useBillsStore(state => state.notTransformedBills);
    const goodsFromStore = useGoodsStore(state => state.goods);
    const paymentsFromStore = usePaymentStore(state => state.payments);

    const fetchBills = useBillsStore(state => state.fetchBills);
    const fetchGoods = useGoodsStore(state => state.setGoods);
    const fetchPayments = usePaymentStore(state => state.setPayments);


   
    const { data: session, status } = useSession();

    const [userIdFromSession, setUserIdFromSession] = useState<string>(status === 'authenticated' ? session?.user?.id : '');
    if (status === 'unauthenticated') {
        redirect('/signin');
    }



    useEffect(() => {
        setLoading(true);
        fetchPayments();
        fetchGoods();
        fetchBills(goodsFromStore)
            .finally(() => setLoading(false));
       
    }, []);

   

    const loaderStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(-50%,-50%)'

    };
    if (status === "loading") {
        return <div style={loaderStyle}><Spin size="large" tip="Loading..." /></div>;
    }




    const formattedBillsData = billsFromStore.map((bill, index) => ({
        index: index.toString(),
        date: bill.date,
        beforeAmount: bill.beforeAmount,
        credit: bill.amount,
        debit: null,
        balance: bill.beforeAmount + (bill.amount || 0),
        generatorOrReceiver: goodsFromStore.find(supplier => supplier.id === bill.goodsSupplierId)?.name || "",
        billTypeOrPaymentType: bill.type,
        note: null,
    }));


    const formattedPaymentsData = paymentsFromStore.map((payment, index) => ({
        index: index.toString(),
        date: payment.date,
        beforeAmount: payment.beforeAmount,
        credit: null,
        debit: payment.amount,
        balance: payment.beforeAmount - (payment.amount || 0),
        generatorOrReceiver: goodsFromStore.find(supplier => supplier.id === payment.goodsSupplierId)?.name || "",
        billTypeOrPaymentType: payment.type,
        note: payment.note || "",
    }));

    const supplierNamesMap = new Map();
    goodsFromStore.forEach(supplier => {
        supplierNamesMap.set(supplier.id, supplier.name);
    });

    const combinedData = [...formattedBillsData, ...formattedPaymentsData];

    const filterBills = () => {
        const filteredData = combinedData.filter(item => {
            if (supplier && item.generatorOrReceiver !== supplier) return false;
            if (filteredDate.length > 0) {
                const itemDate = new Date(item.date).getTime();
                const startDate = new Date(filteredDate[0]).getTime();
                const endDate = new Date(filteredDate[1]).getTime();
                if (itemDate < startDate || itemDate > endDate) return false;
            }
            return true;
        });

        setTableData(filteredData);
    };



    const handleSupplierSelect = (supplierIdentifier: string) => {
        setSupplier(goodsFromStore.find(supplier => supplier.id === supplierIdentifier)?.name || "",);
        filterBills();
    };

    const columns = [
        {
            title: 'DATE',
            dataIndex: 'date',
            width: 120,
            render: (text: string) => text ? <p>{format(new Date(text), 'dd/MM/yyyy')}</p> : "-",
        },
        {
            title: 'OPENING BALANCE',
            dataIndex: 'beforeAmount',
            width: 150,
            render: (text: number) => text ? <p>{text.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p> : "₹0",
        },
        {
            title: 'CREDIT',
            dataIndex: 'credit',
            width: 100,
            render: (text: number) => text? <Tag color="green">{text.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</Tag>:"-", 
        },
        {
            title: 'DEBIT',
            dataIndex: 'debit',
            width: 100,
            render: (text: number) => text ? <Tag color="volcano">{text.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</Tag> : "-", 
        },
        {
            title: 'BALANCE',
            dataIndex: 'balance',
            width: 150,
            render: (text: number) =>  text? <p>{text.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>: "-", 
        },
        {
            title:"Supplier",
            dataIndex:"generatorOrReceiver",
            width: 150,
        },
        {
            title:"Bill/PAYMENT Mode",
            dataIndex:"billTypeOrPaymentType",
            width: 150,
        },
        {
            title: 'NOTE',
            dataIndex: 'note',
            width: 200,
            render: (text: string, record: any) => <p>{text ? record.note : record.name}</p>,
        },
    ];


    return (
        <>
            <Flex justify="space-between" style={{ margin: 8 }}>
                <GoodsSupplierSelect onSupplierSelect={handleSupplierSelect} />
                <RangePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={(value, dateString) => {
                        setFilteredDate(dateString);
                        filterBills();
                    }}
                />
            </Flex>

            <div style={{ overflowX: 'auto' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <Table dataSource={tableData} columns={columns} pagination={{ pageSize: 5 }} scroll={{ x: 'max-content', y: 240 }} />
                )}
            </div>
        </>
    );
};

export default BalanceSheet;
