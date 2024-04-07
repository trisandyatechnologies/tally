

import React, {useEffect,useState} from 'react'
import {Select, Spin} from 'antd';
import { getAllGoodsSuppliers } from '@/lib/api';
// import {GoodsSupplier} from '@prisma/client';


const {Option} = Select;

interface GoodsSupplierSelectProps {
    userId: string;
    onSupplierSelect: (supplierId: string) => void;
}



export default function GoodsSupplierSelect({userId, onSupplierSelect}:GoodsSupplierSelectProps) {
    const [goodsSuppliers, setGoodsSuppliers] = useState<GoodsSupplier[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        getAllGoodsSuppliers(userId)
            .then((suppliers) => {
                setGoodsSuppliers(suppliers);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            })
    }, [userId]);

    return (
        <Select
            placeholder = "Select Supplier"
            loading = {loading}
            notFoundContent = {loading ? <Spin size="small" /> : null}
            onChange = {onSupplierSelect}
        >
            {goodsSuppliers.map((supplier) => (
                <Option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                </Option>
            ))}
        </Select>
    );

} 