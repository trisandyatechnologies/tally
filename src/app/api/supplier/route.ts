

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

// export async function POST(req: NextRequest, res: NextResponse) {

//         try {
//             const {userId, ...restBody} = await req.json();
//             const newGoodsSupplier = await prisma.goodsSupplier.create({
//                 data: {
//                    ...restBody,
//                     user: {
//                         connect: {
//                             id: userId,
//                         },
//                     },
//                 },
//             });

//             return NextResponse.json({ newGoodsSupplier, status: 200 });
//         } catch (error) {
//             console.error('Error adding goods supplier:', error);
//             return NextResponse.json({
//                 error: "User ID is required as a query parameter",
//                 status: 400
//             });
//         }

// }

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


// type UserRequestParams = {
//     params: {
//         userId: string;
//     };
// };



// export async function GET(req: NextRequest,  res: NextResponse) {
//     try {

//         console.log(req);
//         const userId = req.nextUrl.searchParams.get('userId') as string;

//         const goodsSuppliers = await prisma.goodsSupplier.findMany({
//             where: {
//                 userId: userId,
//             },
//         });

//         return NextResponse.json({ goodsSuppliers, status: 200 });
//     } catch (error) {
//         console.error('Error fetching goods suppliers:', error);
//         return NextResponse.json({
//             error: "User ID is required as a query parameter",
//             status: 400
//         });
//     }
// }


export async function GET(req: Request, res: Response) {
    const session = await getServerSession(authOptions);

    const orders = await prisma.goodsSupplier.findMany({
        where: {
            userId: session?.user.id,
        },
    });
    return NextResponse.json(orders);
}