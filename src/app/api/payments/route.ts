import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { userId, goodsSupplierId, ...paymentBody } = await req.json();
  const payment = await prisma.payment.create({
    data: {
      ...paymentBody,
      // user: {
      //   connect: {
      //     id: userId,
      //   },
      // },
      // goodsSupplier: {
      //   connect: {
      //     id:goodsSupplierId,
      //   }
      // }
    },
  });
  return NextResponse.json(payment);
}
export async function GET(req: Request, res: Response) {
  const payments = await prisma.payment.findMany({});
  return NextResponse.json(payments);
}
