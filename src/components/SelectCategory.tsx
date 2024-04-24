"use client";
import React, { useEffect, useState } from "react";
import { Select, SelectProps, Space, Typography } from "antd";
import { getSupplier } from "@/lib/api";
import { DefaultOptionType } from "antd/es/select";

const SelectCategory: React.FC = ({ onChange }: Partial<SelectProps>) => {
    const [options, setOptions] = useState<DefaultOptionType[]>([]);
    useEffect(() => {
        getSupplier().then((catagories = []) => {
            const optionsOpt = catagories.map((category: any) => ({
                label: category.name,
                value: category.id,
            }));

            setOptions(optionsOpt);
        });
    }, []);

    return (
        <Select
            defaultValue="Select Supplier"
            style={{ width: "100%" }}
            onChange={onChange}
            options={options}
        />
    );
};

export default SelectCategory;