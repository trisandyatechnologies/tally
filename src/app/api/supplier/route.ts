

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import { StringGradients } from 'antd/es/progress/progress';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface GoodsSupplierRequestBody {
    userId: string;
    name: string;
    address: string;
    contact: string;
    gstNo: string;
    aadhar: string;
    owner: string;
}


export async function POST(req: NextRequest, res: Response) {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const orderBody = await req.json();
    console.log({ orderBody });
    const order = await prisma.goodsSupplier.create({
        data: {
            
            ...orderBody,
            
            user: {
                connect: {
                    id: session?.user.id,
                },
            },
        },
    });
    return NextResponse.json(order);
}




// export async function GET(req: Request, res: Response) {
//     const session = await getServerSession(authOptions);

//     // const url = new URL(req.url);
//     // const user = url.searchParams.get('userId') as string;
    
//     const orders = await prisma.goodsSupplier.findMany({
//         where: {
//             userId: session?.user.id,
//         },
//     });
//     return NextResponse.json(orders);
// }


export async function GET(req: Request, res: Response) {
    try {
        const session = await getServerSession(authOptions);

        // const url = new URL(req.url);
        // const user = url.searchParams.get('userId') as string;

        const orders = await prisma.goodsSupplier.findMany({
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