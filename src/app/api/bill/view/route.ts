

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    const session = await getServerSession(authOptions);

    const orders = await prisma.bill.findMany({
        where: {
            userId: session?.user.id,
        },
    });
    return NextResponse.json(orders);
}