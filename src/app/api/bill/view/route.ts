import { useSearchParams } from 'next/navigation';


import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    const session = await getServerSession(authOptions);
    // const params = useSearchParams();
    // const {userId} = req.query;
    // const url = new URL(req.url);
    // const user = url.searchParams.get('userId') as string;
    
    
    const orders = await prisma.bill.findMany({
        where: {
            userId: session?.user.id,
            // userId: user,
        },
        include: {
            goodsSupplier: true,
        }
    });
    console.log(orders);
    return NextResponse.json(orders);
}