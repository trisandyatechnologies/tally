
"use client";



import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, message } from 'antd';
import { useSession } from 'next-auth/react';
import { createSupplier } from '@/lib/api';

export default function AddGoodsSupplier() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();

   

    const [form] = Form.useForm()
    const onFinish = async (values: any) => {
        try {
            const item = await createSupplier(values);
            if (item?.id) {
                message.success("Supplier Added");
                form.resetFields();
            } else {
                message.error("Failed to add the Supplier");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Add Goods Supplier</h1>
            <Form layout="vertical" onFinish={onFinish} form={form}>
                {/* Remove userId field from the form */}
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Contact" name="contact" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="GST Number" name="gstNo" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Aadhar" name="aadhar" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Owner" name="owner" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}