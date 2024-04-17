"use client"
import { Form, Input, Button, Select, DatePicker, Row, Col, message, InputNumber } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { BillType, GoodsSupplier } from '@prisma/client';
import { addBillForUser } from '@/lib/api';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SelectCategory from './SelectCategory';

interface NewBillFormProps {
    supplier: GoodsSupplier;
}


export default function NewBillForm() {
    const [form] = useForm();

    const { data: session, status } = useSession();
    const router = useRouter();

    if (status !== 'authenticated') {
        router.push('/signin');
        return;
    }

    const userId = session?.user?.id;

    if (!userId) {
        router.push('/signin');
        return;
    }



    const onFinishHandler = async (values: any) => {
        try {
            const item = await addBillForUser(values);
            if (item?.id) {
                message.success("Bill Added");
                form.resetFields();
            } else {
                message.error("Failed to add the Bill");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <Form form={form} onFinish={onFinishHandler} layout="vertical">
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item label="Supplier Name" name='goodsSupplier' >
                        <SelectCategory />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the bill name' }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the bill date' }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please enter the bill amount' }]}>
                        <InputNumber type="number" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24}>
                    <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select the bill type' }]}>
                        <Select style={{ width: '100%' }}>
                            {Object.values(BillType).map(type => (
                                <Select.Option key={type} value={type}>
                                    {type}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="center">
                <Col>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
