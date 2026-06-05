import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "admin-agent-gui",
    version: "0.1.0",
    timestamp: new Date().toISOString(),
  });
}
