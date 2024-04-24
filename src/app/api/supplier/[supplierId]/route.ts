
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export interface orderRequestParams {
    params: { supplierId: string };
}

export async function GET(req: Request, { params }: orderRequestParams) {
    const order = await prisma.goodsSupplier.findUnique({
        where: {
            id: params.supplierId,
        },
    });
    return NextResponse.json(order);
}