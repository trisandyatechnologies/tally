"use client";

import NewBillForm from "@/components/NewBillForm";
import {GoodsSupplier} from '@prisma/client';



export default function createBill(supplier: GoodsSupplier){
    return (
        <NewBillForm  />
    )
}

