

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export interface paymentRequestParams {
    params: { paymentId: string };
}
export async function GET(req: Request, { params }: paymentRequestParams) {
    const payments = await prisma.payment.findUnique({
        where: {
            id: params.paymentId,
        },
    });
    return NextResponse.json(payments);
}
export async function PUT(req: Request, { params }: paymentRequestParams) {
    const paymentBody = await req.json();
    const payment = await prisma.payment.update({
        data: paymentBody,
        where: {
            id: params.paymentId,
        },
    });
    return NextResponse.json(payment);
}

export async function DELETE(req: Request, { params }: paymentRequestParams) {
    const payment = await prisma.payment.delete({
        where: {
            id: params.paymentId,
        },
    });
    return NextResponse.json(payment);
}