"use client";
import React, { useEffect, useState } from "react";
import { Flex, Select } from "antd";
import { Typography } from "antd";
import { DatePicker, Space } from "antd";
import type { DatePickerProps, GetProps } from "antd";

const balanceSheet: React.FC = () => {
  const [selectedShop, setSelectedShop] = useState("");
  const [filterdDate, setFilteredDate] = useState([""]);
  const [tableData, setTableData] = useState([]);

  const onChange = (value: string) => {
    setSelectedShop(value);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

  const { RangePicker } = DatePicker;

  const onOk = (
    value: DatePickerProps["value"] | RangePickerProps["value"]
  ) => {
  };

  const onSearch = (value: string) => {
    
  };
 

  const billData = [
    {
      id: "10",
      name: "biscuits",
      date: "2024-04-04",
      amount: 7500.51,
      beforeAmount: 0,
      type: "GST",
      supplierId: "trinadh",
      currentsupplierAmount: 7500.51,
      userId: "vinay",
    },
    {
      id: "11",
      name: "lays",
      date: "2024-04-04",
      amount: 8500.51,
      beforeAmount: 0,
      type: "GST",
      supplierId: "prasad",
      currentsupplierAmount: 8500.51,
      userId: "vinay",
    },
    {
      id: "12",
      name: "pens",
      date: "2024-04-05",
      amount: 500.51,
      beforeAmount: 0,
      type: "GST",
      supplierId: "durga",
      currentsupplierAmount: 500.51,
      userId: "vinay",
    },
    {
      id: "13",
      name: "chocolates",
      date: "2022-03-15",
      amount: 985.51,
      beforeAmount: 0,
      type: "GST",
      supplierId: "ratna",
      currentsupplierAmount: 985.51,
      userId: "vinay",
    },
    {
      id: "14",
      name: "chocolates",
      date: "2024-04-20",
      amount: 1000,
      beforeAmount: 0,
      type: "NON_GST",
      supplierId: "prasad",
      currentsupplierAmount: 1000,
      userId: "vinay",
    },
  ];
  const paymentData = [
    {
      id: "50",
      note: "biscuits",
      date: "2024-04-19",
      payingamount: 7500.51,
      beforeAccountBalance: 7500.51,
      paymenttype: "CASH",
      supplierId: "trinadh",
      supplierAmountRemaining: 0,
      userId: "vinay",
      receiver: "trinadh",
    },
    {
      id: "51",
      note: "lays",
      date: "2024-04-05",
      payingamount: 8500.51,
      beforeAccountBalance: 8500.51,
      paymenttype: "DIGITAL",
      supplierId: "prasad",
      supplierAmountRemaining: 0,
      userId: "vinay",
      receiver: "prasad",
    },
    {
      id: "52",
      note: "pens",
      date: "2024-04-05",
      payingamount: 500.51,
      beforeAccountBalance: 500.51,
      paymenttype: "DIGITAL",
      supplierId: "durga",
      supplierAmountRemaining: 0,
      userId: "vinay",
      receiver: "durga",
    },
    {
      id: "53",
      note: "chocolates",
      date: "2022-03-15",
      payingamount: 985.51,
      beforeAccountBalance: 985.51,
      paymenttype: "DIGITAL",
      supplierId: "ratna",
      supplierAmountRemaining: 0,
      userId: "vinay",
      receiver: "ratna",
    },
  ];

  const fullData = [...billData, ...paymentData];
  const DATA = fullData.sort((a, b) => {
    const dateA: any = new Date(a.date);
    const dateB: any = new Date(b.date);
    return dateA - dateB;
  });

  function fetchData(selectedShop: String, filteredDate: any) {
    if (selectedShop != "" && filteredDate.length > 1) {
      const fromDate = filteredDate[0]
        .slice(0, 10);
      const endDate = filteredDate[1]
        .slice(0, 10);
      const billedDates = DATA.filter(
        (bill) =>
          bill.date >= fromDate &&
          bill.date <= endDate &&
          bill.supplierId == selectedShop
      );
      return billedDates;
    } else if (selectedShop != "" && filteredDate.length <= 1) {
      const billedDataForShops = DATA.filter(
        (bill) => bill.supplierId == selectedShop
      );
      return billedDataForShops;
    } else if (selectedShop == "" && filteredDate.length > 1) {
      const fromDate = filteredDate[0]
        .slice(0, 10);
      const endDate = filteredDate[1]
        .slice(0, 10);
      const billedForDates = DATA.filter(
        (bill) => bill.date >= fromDate && bill.date <= endDate
      );
      return billedForDates;
    } else {
      return DATA;
    }
  }

  useEffect(() => {
    const DATA: any = fetchData(selectedShop, filterdDate);
    setTableData(DATA);
  }, [selectedShop, filterdDate]);
  return (
    <>
      <Typography.Title style={{ textAlign: "center" }}>
        Balance Sheet
      </Typography.Title>

      <Flex justify="space-between" style={{ margin: 8 }}>
        <Select
          showSearch
          placeholder="Select the shop"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: "trinadh",
              label: "Trinadh",
            },
            {
              value: "prasad",
              label: "Prasad",
            },
            {
              value: "durga",
              label: "Durga",
            },
            {
              value: "ratna",
              label: "Ratna",
            },
          ]}
        />
        <RangePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          onChange={(value, dateString) => {
            console.log("Selected Time: ", value);
            console.log("Formatted Selected Time: ", dateString);
            setFilteredDate(dateString);
          }}
          onOk={onOk}
        />
      </Flex>
      {/* <Table>
        <ColumnGroup>
          <Table.Column title="DATE" dataIndex="Date" key="Date" />

          <Table.Column
            title="OPENING BALANCE"
            dataIndex="opening_balance"
            key="opening_balance"
          />

          <Table.Column title="CREDIT" dataIndex="credit" key="credit" />

          <Table.Column title="DEBIT" dataIndex="debit" key="debit" />

          <Table.Column title="BILL NO" dataIndex="bill_no" key="bill_no" />

          <Table.Column
            title="MODE OF PAYMENT"
            dataIndex="mode_of_payment"
            key="mode_of_payment"
          />

          <Table.Column title="TO" dataIndex="to" key="to" />

          <Table.Column title="NOTE" dataIndex="note" key="note" />
        </ColumnGroup>

        {tableData.map((data: any) => {
          return (
            <>
              <Column title={data.date} dataIndex={data.date} key={data.id} />
              <Column
                title={data.amount}
                dataIndex={data.amount}
                key={data.id}
              />
              <Column
                title={data.amount}
                dataIndex={data.amount}
                key={data.id}
              />
              {data.type == "GST" || "NON_GST" ? (
                <Column
                  title={data.amount}
                  dataIndex={data.amount}
                  key={data.id}
                />
              ) : (
                <Column
                  title={data.supplierAmount}
                  dataIndex={data.supplierAmount}
                  key={data.id}
                />
              )}

              {data.type == "DIGITAL" ||
                ("CASH" && (
                  <Column title={data.id} dataIndex={data.id} key={data.id} />
                ))}
              {data.type == "DIGITAL" ||
                ("CASH" && (
                  <Column
                    title={data.type}
                    dataIndex={data.type}
                    key={data.id}
                  />
                ))}
              {data.type == "DIGITAL" ||
                ("CASH" && (
                  <Column
                    title={data.supplierId}
                    dataIndex={data.supplierId}
                    key={data.supplierId}
                  />
                ))}
              {data.note ? data.note : "-"}
            </>
          );
        })}
      </Table> */}
      <table width="100%" cellPadding={2} border={2}>
        <thead>
          <tr>
            <th>DATE</th>
            <th>OPENING BALANCE</th>
            <th>CREDIT</th>
            <th>DEBIT</th>
            <th>BALANCE</th>
            <th>BILL NO</th>
            <th>MODE OF PAYMENT</th>
            <th>TO</th>
            <th>NOTE</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data: any) => {
            return (
              <tr key={data.id}>
                <th>{data.date.split("-").reverse().join("-")}</th>
                <th>
                  {data.payingamount
                    ? data.beforeAccountBalance
                    : data.beforeAmount}
                </th>
                <th>{data.type ? data.amount : "-"}</th>
                <th> {data.paymenttype ? data.payingamount : "-"}</th>
                <th>
                  {data.payingamount
                    ? data.supplierAmountRemaining
                    : data.currentsupplierAmount}
                </th>
                <th>{data.paymenttype ? data.id : "-"}</th>
                <th>{data.paymenttype ? data.paymenttype : "-"}</th>
                <th>{data.supplierId}</th>
                <th>{data.paymenttype ? data.note : data.name}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default balanceSheet;
