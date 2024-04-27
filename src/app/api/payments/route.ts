

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";

export async function POST(req: Request, res: Response) {
    const { userId, goodsSupplierId, amount, ...paymentBody } = await req.json();
    const goodsSupplier = await prisma.goodsSupplier.findUnique({
        where: {
            id: goodsSupplierId,
        }
    })

    const goodsSupplierAmount = goodsSupplier?.amount;

    const goodsSupplierAmountUpdate = await prisma.goodsSupplier.update({
        where: {
            id: goodsSupplierId,
        },
        data: {
            amount: goodsSupplierAmount! - amount,
            
        }
    })
    const payment = await prisma.payment.create({
        data: {
            ...paymentBody,
            amount,
            beforeAmount: goodsSupplierAmount,
            currentsupplierAmount: goodsSupplierAmount! - amount,
            user: {
                connect: {
                    id: userId,
                },
            },
            goodsSupplier: {
                connect: {
                    id: goodsSupplierId,
                }
            }
        },
    });
    return NextResponse.json(payment);
}
export async function GET(req: Request, res: Response) {
    try {
        const session = await getServerSession(authOptions);

        // const url = new URL(req.url);
        // const user = url.searchParams.get('userId') as string;

        const orders = await prisma.payment.findMany({
            where: {
                userId: session?.user.id,
            },
        });
        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json([]);
    }
}