// app/api/views/[id]/route.ts
import { writeClient } from "@/sanity/lib/write-client";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    await writeClient
      .patch(id)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to increment views:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
