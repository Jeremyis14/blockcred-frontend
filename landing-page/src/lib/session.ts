import crypto from "crypto";

const COOKIE_NAME = "bc_session";
const DEFAULT_TTL = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  return process.env.BLOCKCRED_SESSION_SECRET || "dev-insecure-secret-change-me";
}

export type SessionPayload = {
  sub: string; // user id or email
  iat: number;
  exp: number;
};

export function signSession(payload: SessionPayload) {
  const secret = getSecret();
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function verifySession(token?: string): SessionPayload | null {
  if (!token) return null;
  const secret = getSecret();
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  if (!timingSafeEqual(sig, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as SessionPayload;
    if (typeof payload.exp === "number" && Date.now() / 1000 > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

function timingSafeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export function createSessionCookie(sub: string, ttlSeconds = DEFAULT_TTL) {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = { sub, iat: now, exp: now + ttlSeconds };
  const token = signSession(payload);
  const isProd = process.env.NODE_ENV === "production";
  return {
    name: COOKIE_NAME,
    value: token,
    options: {
      httpOnly: true as const,
      sameSite: "lax" as const,
      secure: isProd,
      path: "/",
      maxAge: ttlSeconds,
    },
  };
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
