import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export interface SupplierRequestParams {
  params: { supplierId: string };
}

export async function GET(req: Request, { params }: SupplierRequestParams) {
  try {
    const supplier = await prisma.goodsSupplier.findUnique({
      where: {
        id: params.supplierId,
      },
    });
    return NextResponse.json(supplier);
  } catch (error) {
    console.error("Error fetching supplier:", error);
    return NextResponse.json({
      error: "An error occurred while fetching supplier",
    });
  }
}

export async function PUT(req: Request, { params }: SupplierRequestParams) {
  try {
    const { id, ...supplierBody } = await req.json();
    const supplier = await prisma.goodsSupplier.update({
      data: supplierBody,
      where: {
        id: params.supplierId,
      },
    });
    return NextResponse.json(supplier);
  } catch (error) {
    console.error("Error updating supplier:", error);
    return NextResponse.json({
      error: "An error occurred while updating supplier",
    });
  }
}

export async function PATCH(req: Request, { params }: SupplierRequestParams) {
  try {
    const supplierBody = await req.json();
    const supplier = await prisma.goodsSupplier.update({
      data: supplierBody,
      where: {
        id: params.supplierId,
      },
    });
    return NextResponse.json(supplier);
  } catch (error) {
    console.error("Error updating supplier:", error);
    return NextResponse.json({
      error: "An error occurred while updating supplier",
    });
  }
}

export async function DELETE(req: Request, { params }: SupplierRequestParams) {
  try {
    const supplier = await prisma.goodsSupplier.delete({
      where: {
        id: params.supplierId,
      },
    });
    return NextResponse.json(supplier);
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return NextResponse.json({
      error: "An error occurred while deleting supplier",
    });
  }
}
