"use client";

import React, { useEffect } from "react";
import { usePaymentStore } from "@/lib/paymentStore";
import { Table } from "antd";

export default function PaymentView() {
  const payments = usePaymentStore((s) => s.payments);
  const setPayments = usePaymentStore((s) => s.setPayments);

  useEffect(() => {
    setPayments();
  }, [setPayments]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      key: "receiver",
    },
    {
      title: "PaymentType",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <main>
      <Table dataSource={payments} columns={columns} />
    </main>
  );
}
