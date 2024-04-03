"use client";
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";

const { Option } = Select;

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

const RecordDigital: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+91</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
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
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="shop name"
        label="Shop Name"
        rules={[
          {
            required: true,
            message: "Please select your shop name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="type of payment"
        label="Type Of Payment"
        rules={[{ required: true, message: "Please select payment Type!" }]}
      >
        <Select
          placeholder="select your Payment Type"
          style={{ width: 200 }}
          onChange={handleChange}
          options={[
            {
              label: <span>UPI</span>,
              title: "UPI",
              options: [
                { label: <span>Google Pay</span>, value: "GooglePay" },
                { label: <span>Phone Pay</span>, value: "Phone Pay" },
                { label: <span>other Pay</span>, value: "Other Pay" },
              ],
            },
            {
              label: <span> Bank Transfer</span>,
              title: "Bank Transfer",
              options: [{ label: <span>Bank Name</span>, value: "Bank Name" }],
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        name="phone number"
        label="Account/ph No"
        rules={[
          {
            required: true,
            message: "Please select your ph/account number!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="name"
        label="Person Name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RecordDigital;
