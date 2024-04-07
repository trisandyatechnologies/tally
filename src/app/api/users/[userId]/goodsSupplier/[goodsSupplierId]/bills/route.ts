import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

type RequestParams = {
    params: {
        userId: string,
        goodsSupplierId: string,
    };
}

export async function GET(req: Request, { params }: RequestParams) {
    const { userId, goodsSupplierId } = params;

    try {
        // Retrieve bills for the specified user and goods supplier
        const bills = await prisma.bill.findMany({
            where: {
                userId,
                goodsSupplierId,
            },
        });

        if (!bills || bills.length === 0) {
            return NextResponse.json({ error: "No bills found for this user and goods supplier" }, { status: 404 });
        }

        // Return the retrieved bills
        return NextResponse.json(bills);
    } catch (error) {
        // Handle database errors
        console.error("Error fetching bills:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
