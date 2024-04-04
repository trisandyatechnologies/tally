import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: Response) {
    // const session = await getServerSession(authOptions);
    // if (!session?.user.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    const supplierBody = await req.json();
    console.log({ supplierBody });
    const supplier = await prisma.goodsSupplier.create({
      data: {
        ...supplierBody,
        // user: {
        //   connect: {
        //     id: session?.user.id,
        //   },
        // },
      },
    });
    return NextResponse.json(supplier);
  }




 export async function GET(req: Request, res: Response) {
    const supplier = await prisma.goodsSupplier.findMany({});
    return NextResponse.json(supplier);
  }