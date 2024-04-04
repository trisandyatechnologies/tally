import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export interface SupplierRequestParams {
  params: { supplierId: string };
}

export async function GET(req: Request, { params }: SupplierRequestParams) {
  const supplier = await prisma.goodsSupplier.findUnique({
    where: {
      id: params.supplierId,
    },
  });
  return NextResponse.json(supplier);
}

export async function PUT(req: Request, { params }: SupplierRequestParams) {
  const { id, ...supplierBody } = await req.json();
  const supplier = await prisma.goodsSupplier.update({
    data: supplierBody,
    where: {
      id: params.supplierId,
    },
  });
  return NextResponse.json(supplier);
}


export async function PATCH(req: Request, { params }: SupplierRequestParams) {
    const supplierBody = await req.json();
    const supplier = await prisma.goodsSupplier.update({
      data: supplierBody,
      where: {
        id: params.supplierId,
      },
    });
    return NextResponse.json(supplier);
  }
  
  export async function DELETE(req: Request, { params }: SupplierRequestParams) {
      const supplier = await prisma.goodsSupplier.delete({
        where: {
          id: params.supplierId,
        },
      });
      return NextResponse.json(supplier);
    }