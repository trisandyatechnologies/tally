

import { create } from "zustand";
import { message } from "antd";
import { Payment } from "@prisma/client";
import { getPayments, updatePayment } from "./api";

interface PaymentStore {
    payments: Payment[];
    payment?: Payment;
    setPayments: () => void;
    updatedPayment: (id: string, updateBody: Partial<Payment>) => void;
    reset: () => void;
}

export const usePaymentStore = create<PaymentStore>((set, get) => ({
    payments: [],
    setPayments: async () => {
        const payments = await getPayments();
        set({ payments: payments });
    },
    updatedPayment: async (id: string, update: Partial<Payment>) => {
        const updated = await updatePayment(id, update);
        if (updated) {
            set({ payment: updated });
        } else {
            message.error("Failed to update.");
        }
    },
    reset: () => {
        set({ payments: undefined });
    },
}));