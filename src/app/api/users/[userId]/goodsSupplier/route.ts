
//api/users/userId/goodsSupplier/route.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

type UserRequestParams = {
    params: {
        userId: string;
    };
};

export async function GET(req: Request, { params }: UserRequestParams) {
    try {
        // Retrieve user with goods suppliers
        const userWithGoodsSuppliers = await prisma.user.findUnique({
            where: {
                id: params.userId,
            },
            include: {
                goodsSuppliers: true,
            },
        });

        if (!userWithGoodsSuppliers) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return the retrieved goods suppliers
        return NextResponse.json(userWithGoodsSuppliers.goodsSuppliers);
    } catch (error) {
        // Handle database errors
        console.error("Error fetching goods suppliers:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
