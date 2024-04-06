"use client";
import { createPayment } from "@/lib/api";
import { Button, DatePicker, Form, Input, Select, message } from "antd";
import { Option } from "antd/es/mentions";
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

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    debugger;
    const payment = await createPayment({ ...values });
    if (payment?.id) {
      message.success("Project added");
      form.resetFields();
    } else {
      message.error("Failed to add the project");
    }
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="date"
        label="Date"
        rules={[{ required: true, message: "Please enter the date" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, message: "Please enter the amount" }]}
      >
        <Input type="number" placeholder="select your Amount" />
      </Form.Item>

      <Form.Item name="voucherNo" label="Voucher Number">
        <Input placeholder="select your voucher Number" />
      </Form.Item>

      <Form.Item
        name="receiver"
        label="Received Cash"
        rules={[{ required: true, message: "Please enter the receiver" }]}
      >
        <Input placeholder="select your received Cash" />
      </Form.Item>

      <Form.Item name="note" label="Note">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="type"
        label="PaymentType"
        rules={[{ required: true, message: "Please select the payment type" }]}
      >
        <Select placeholder="select your Payment Type">
          <Select.Option value="CASH">Cash</Select.Option>
          <Select.Option value="DIGITAL">Digital</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="paymentMethod"
        label="PaymentMethod"
        rules={[{ required: false, message: "Please select the payment type" }]}
      >
        <Select
          placeholder="select your Payment Method"
          style={{ width: "100%" }}
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

      <Form.Item name="goodsSupplierId" label="Goods Supplier ID">
        <Input placeholder="select your goodsSupplierId" />
      </Form.Item>

      <Form.Item name="userId" label="User ID">
        <Input placeholder="select your UserId" />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
