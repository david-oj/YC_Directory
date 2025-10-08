// app/api/views/[id]/route.ts
import { writeClient } from "@/sanity/lib/write-client";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const {id} = await params;

  try {
  const res =  await writeClient
      .patch(id)
      .inc({ views: 1 })
      .commit();
console.log("Result:", res);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to increment views:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
