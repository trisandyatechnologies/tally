

// import { Bill } from "@prisma/client";
// import { create } from "zustand";
// import { getBills } from "./api";

// interface useBillsStore {
//     bills: Bill[];
//     setBills: () => void;
// }

// export const useBillsStore = create<useBillsStore>((set, get) => ({
//     bills: [],
//     setBills: async () => {
//         const bills = await getBills();
//         set({ bills });
//     },
// }));


// import { Bill } from "@prisma/client";
// import { create } from "zustand";
// import { getAllBillsForUser } from "./api";

// interface useBillsStore {
//     bills: Bill[];
//     setBills: (bills: Bill[]) => void; 
// }

// export const useBillsStore = create<useBillsStore>((set, get) => ({
//     bills: [],
//     setBills: (bills: Bill[]) => { 
//         set({ bills });
//     },
// }));

import { Bill, GoodsSupplier } from "@prisma/client";
import { create } from "zustand";
import { getBills } from "./api";
import moment from 'moment'; // Import moment for date formatting

interface useBillsStore {
    bills: Bill[];
    notTransformedBills :Bill[];
    fetchBills: (goods: GoodsSupplier[]) => Promise<void>;
}

export const useBillsStore = create<useBillsStore>((set, get) => ({
    bills: [],
    notTransformedBills : [],
    fetchBills: async (goods: GoodsSupplier[]) => {
        try {
            const bills = await getBills();
            set({ notTransformedBills: bills });
            const transformedBills = transformBillData(bills, goods);
            set({ bills: transformedBills });
        } catch (error) {
            console.error('Error fetching the bills:', error);
        }
    },
}));

const transformBillData = (data: Bill[], goods: GoodsSupplier[]): Bill[] => {
    return data.map((bill, index) => {
        const serialName = index + 1;
        const goodsSupplier = goods.find(supplier => supplier.id === bill.goodsSupplierId);
        const goodsSupplierName = goodsSupplier ? goodsSupplier.name : 'Unknown';
        const formattedDate = moment.utc(bill.date).format('DD-MMM-YYYY'); 
        return {
            ...bill,
            formattedDate, 
            serialName,
            goodsSupplierName
        };
    });
};

