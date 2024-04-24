import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: Request, res: Response) {
//   const { userId, ...paymentBody } = await req.json();
//   const payment = await prisma.payment.create({
//     data: {
//       ...paymentBody,
//       user: {
//         connect: {
//           id: userId,
//         },
//       },
//       // goodsSupplier: {
//       //   connect: {
//       //     id:goodsSupplierId,
//       //   }
//       // }
//     },
//   });
//   return NextResponse.json(payment);
// }
export async function GET(req: Request, res: Response) {
  const payments = await prisma.payment.findMany({});
  return NextResponse.json(payments);
}
export async function POST(req: NextRequest, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orderBody = await req.json();
  console.log({ orderBody });
  const order = await prisma.payment.create({
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
