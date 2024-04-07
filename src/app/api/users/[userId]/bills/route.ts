import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type UserRequestParams = {
    params: {
        userId: string;
    }
}

export async function GET(req: Request, { params }: UserRequestParams) {
    // Validate userId parameter
    const { userId } = params;
    if (!userId) {
        return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
    }

    try {
        // Retrieve user with bills
        const userWithBills = await prisma.user.findUnique({
            where: { id: userId },
            include: { bills: true },
        });

        if (!userWithBills) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return user data
        return NextResponse.json(userWithBills);
    } catch (error) {
        // Handle database errors
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
