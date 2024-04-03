"use client";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import { useState } from "react";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export default function RecordCash() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="Shop name"
        label="Shop Name"
        rules={[
          {
            required: true,
            message: "Please select Shop name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="Date"
        label="Date"
        rules={[
          {
            required: true,
            message: "Please select your date!",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="Amount"
        label="Amount"
        rules={[
          {
            required: true,
            message: "Please select your Amount!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="Voucher"
        label="Voucher Number"
        rules={[
          {
            required: false,
            message: "Please select Voucher!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Received Cash"
        label="Received Cash"
        rules={[
          {
            required: true,
            message: "Please input your cash!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
