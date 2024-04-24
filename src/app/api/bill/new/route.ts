
import { GoodsSupplier } from '@prisma/client';


import GoodsSupplierSelect from "@/components/GoodsSupplierSelect";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: Response) {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const orderBody = await req.json();
        console.log({ orderBody });

        const { goodsSupplier,amount, ...orderData } = orderBody;
        console.log("GoodsSupplier:", orderBody.goodsSupplier);
        // console.log("Goods Supplier ID",goodsSupplierId);
    
        const getgoodsSupplier = await prisma.goodsSupplier.findUnique({
            where:{
                id: goodsSupplier
            }
        })


        const previousAmount = getgoodsSupplier?.amount;

        const GoodsSupplierAmountUpdate = await prisma.goodsSupplier.update({
            where: {
                id: goodsSupplier
            },
            data: {
                amount: previousAmount+ amount,
            }


        })

        const order = await prisma.bill.create({
            data: {
                ...orderData,
                beforeAmount: previousAmount,
                currentsupplierAmount: previousAmount + amount,
                amount,
                user: {
                    connect: {
                        id: session?.user.id,
                    },
                },
                goodsSupplier: {
                    connect: {
                        id: orderBody.goodsSupplier
                    },
                },
            },
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error("Error creating bill:", error);
        return NextResponse.json({ error: "Failed to create bill" }, { status: 500 });
    }
}