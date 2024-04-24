"use client";
import { createPayment } from "@/lib/api";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  message,
  theme,
} from "antd";
import { Option } from "antd/es/mentions";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Payment from "../payment/page";
import { PaymentMethod, PaymentType } from "@prisma/client";
import { useRouter } from "next/navigation";
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
  const { data: session } = useSession();

  const [paymentType, setPaymentType] = useState<string | null>(null);
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const payment = await createPayment({
      ...values,
      user: session?.user.id,
    });
    if (payment?.id) {
      message.success("Payment added");
      form.resetFields();
    } else {
      message.error("Failed to add the payment");
    }
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);

    setPaymentType(value);
  };
  const {
    token: { margin, padding },
  } = theme.useToken();

  return (
    <main
      style={{
        background: "#16ffb3",

        padding: padding,
      }}
    >
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: 600, margin: "auto" }}
      >
        <Typography.Title style={{ marginLeft: 150 }}>
          Payment Form
        </Typography.Title>
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
          <InputNumber
            placeholder="select your Amount"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item name="voucherNo" label="Voucher Number">
          <Input placeholder="select your voucher Number" />
        </Form.Item>

        <Form.Item
          name="receiver"
          label="Receiver"
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
          rules={[
            { required: true, message: "Please select the payment type" },
          ]}
        >
          <Select
            placeholder="select your PaymentType"
            style={{ width: "100%" }}
            onChange={handleChange}
            options={[
              {
                options: [
                  {
                    label: <span>Cash</span>,
                    value: PaymentType.CASH,
                  },
                  {
                    label: <span>Degital</span>,
                    value: PaymentType.DIGITAL,
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="paymentMethod"
          label="PaymentMethod"
          rules={[
            { required: false, message: "Please select the payment type" },
          ]}
        >
          <Select
            placeholder="select your Payment Method"
            style={{ width: "100%" }}
            disabled={paymentType === PaymentType.CASH}
            onChange={handleChange}
            options={[
              {
                label: <span>UPI</span>,
                title: "UPI",
                options: [
                  {
                    label: <span>Google Pay</span>,
                    value: PaymentMethod.GOOGLEPAY,
                  },
                  {
                    label: <span>Phone Pay</span>,
                    value: PaymentMethod.PHONEPAY,
                  },
                  { label: <span>other Pay</span>, value: PaymentMethod.OTHER },
                ],
              },
            ]}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", borderRadius: 20 }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
}
