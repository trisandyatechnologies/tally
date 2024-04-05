import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: Response) {
  try {
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
  } catch (error) {
    console.error("Error adding suppliers:", error);
    return NextResponse.json({
      error: "An error occurred while adding suppliers",
    });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const supplier = await prisma.goodsSupplier.findMany({});
    return NextResponse.json(supplier);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return NextResponse.json({
      error: "An error occurred while fetching suppliers",
    });
  }
}
