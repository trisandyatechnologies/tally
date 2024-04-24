
import { GoodsSupplier } from "@prisma/client";
import { create } from "zustand";
import { getSupplier } from "./api";

interface useGoodsStore {
    goods: GoodsSupplier[];
    setGoods: () => void;
}

export const useGoodsStore = create<useGoodsStore>((set, get) => ({
    goods: [],
    setGoods: async () => {
        const goods = await getSupplier();
        set({ goods });
    },
}));