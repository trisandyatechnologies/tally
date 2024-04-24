

import React, { useEffect, useState, CSSProperties } from 'react';
import { Select, Spin, Button } from 'antd';
import { useSession } from 'next-auth/react';
import { useGoodsStore } from '@/lib/useGoodsStore';
import { useRouter } from 'next/navigation';

const { Option } = Select;

interface GoodsSupplierSelectProps {
    onSupplierSelect: (supplier: string) => void;
    style?: CSSProperties;
}

const selectStyle: CSSProperties = {
    width: 200, 
};

export default function GoodsSupplierSelect({ onSupplierSelect, style }: GoodsSupplierSelectProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();

    const { goods, setGoods } = useGoodsStore(state => ({
        goods: state.goods,
        setGoods: state.setGoods
    }));

    useEffect(() => {
        const fetchGoods = async () => {
            try {
                setLoading(true);
                await setGoods();
            } catch (error) {
                console.error('Error fetching goods:', error);
            } finally {
                setLoading(false);
            }
        };

        if (status === 'authenticated') {
            fetchGoods();
        }
    }, [status, session, setGoods]);

    const handleAddUser = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push('/supplier');
    };

    return (
        <div style={style}>
            <Select
                placeholder="Select Supplier"
                loading={loading}
                notFoundContent={loading ? <Spin size="small" /> : 'Loading...'}
                onChange={onSupplierSelect}
                style={{ ...selectStyle, ...style }}
                dropdownMatchSelectWidth={false} // Prevent dropdown width from affecting select box width
            >
                <Option key="add-user" onClick={handleAddUser}>
                    <Button
                        type="primary"
                        style={{ backgroundColor: 'blue' }}
                        onClick={handleAddUser}
                    >
                        Add a new supplier
                    </Button>
                </Option>
                {goods.map((supplier) => (
                    <Option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
}
