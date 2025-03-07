import { NextResponse } from "next/server";
import { CategoryEnum } from "@prisma/client";

export async function GET() {
  return NextResponse.json(Object.values(CategoryEnum))
}