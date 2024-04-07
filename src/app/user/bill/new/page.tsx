

import { Form, Input, Button, Select, DatePicker, Row, Col } from 'antd';
import { useForm } from 'antd/lib/form/Form';
// import { BillType, Bill } from '@prisma/client'; 

const NewBillForm: React.FC = () => {
    const [form] = useForm();

    const onFinish = (values: any) => {
        console.log('Received values:', values);
        
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the bill name' }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the bill date' }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please enter the bill amount' }]}>
                        <Input type="number" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select the bill type' }]}>
                        <Select style={{ width: '100%' }}>
                            {Object.values(BillType).map((type) => (
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

export default NewBillForm;
