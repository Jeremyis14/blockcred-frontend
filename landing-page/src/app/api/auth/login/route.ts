import { NextResponse } from "next/server";
import { createSessionCookie } from "../../../../lib/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body ?? {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    // TODO: Validate credentials against database (hash verify)
    // Mock: accept any password that contains a number
    if (!/[0-9]/.test(password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const cookie = createSessionCookie(email);
    const res = NextResponse.json({ ok: true, user: { email } }, { status: 200 });
    res.cookies.set(cookie.name, cookie.value, cookie.options);
    return res;
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
