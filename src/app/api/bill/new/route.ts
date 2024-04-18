

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

        const { goodsSupplierId, ...orderData } = orderBody;

        const order = await prisma.bill.create({
            data: {
                ...orderData,
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