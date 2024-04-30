
import {  GoodsSupplier } from "@prisma/client";
import { create } from "zustand";
import { getBills } from "./api";
import moment from 'moment'; 
import { format } from "date-fns";

interface Bill {
    id: string;
    name: string;
    date: string;
    amount: number;
    type: string;
    goodsSupplierId: string;
    beforeAmount: number;
    currentsupplierAmount: number;
    userId: string;
    billStatus: string;
    goodsSupplier: GoodsSupplier; // Include goodsSupplier information
}

interface useBillsStore {
    bills: Bill[];
    notTransformedBills :Bill[];
    fetchBills: () => Promise<void>;
}

export const useBillsStore = create<useBillsStore>((set, get) => ({
    bills: [],
    notTransformedBills : [],
    fetchBills: async () => {
        try {
            const bills = await getBills();
            set({ notTransformedBills: bills });
            const transformedBills = transformBillData(bills);
            set({ bills: transformedBills });
        } catch (error) {
            console.error('Error fetching the bills:', error);
        }
    },
}));

const transformBillData = (data: Bill[]): Bill[] => {
    return data.map((bill, index) => {
        const serialName = index + 1;
        const goodsSupplierName = bill.goodsSupplier.name;
        // const formattedDate = moment.utc(bill.date).format('DD-MMM-YYYY');
        const formattedDate = format(new Date(bill.date), 'dd/MM/yyyy')
        return {
            ...bill,
            formattedDate, 
            serialName,
            goodsSupplierName
        };
    });
};

