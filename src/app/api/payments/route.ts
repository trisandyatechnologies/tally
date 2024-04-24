

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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
    const payments = await prisma.payment.findMany({});
    return NextResponse.json(payments);
}