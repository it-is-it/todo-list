import { jwtDecode, JwtPayload } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

interface AuthToken extends JwtPayload {
  exp: number;
  iat?: number;
  userId?: string;
  role?: string;
  email?: string;
}

function clearAuthCookies(response: NextResponse): void {
  const authCookies = ["access_token", "refresh_token", "user_id", "email"];

  authCookies.forEach((cookieName) => {
    response.cookies.delete(cookieName);
  });
}

/**
 * Redirect to login with callback URL
 */
function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL("/login", request.url);
  // loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

  const response = NextResponse.redirect(loginUrl);
  clearAuthCookies(response);

  return response;
}

/**
 * Main middleware function - enforces authentication for admin panel
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // console.log("Middleware running for:", pathname);

  // Get access token from cookies
  const accessToken = request.cookies.get("access_token")?.value;

  // No token found - redirect to login
  if (!accessToken) {
    console.warn(`[Auth] No access token found for ${pathname}`);
    return redirectToLogin(request);
  }

  try {
    // Decode and verify the JWT token
    const decoded = jwtDecode<AuthToken>(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if token has expired
    if (!decoded.exp) {
      console.warn(`[Auth] Token missing expiration for ${pathname}`);
      return redirectToLogin(request);
    }

    if (decoded.exp <= currentTime) {
      console.warn(`[Auth] Token expired for ${pathname}`);
      return redirectToLogin(request);
    }

    // Optional: Verify user role for admin access
    // if (decoded.role !== "admin") {
    //     console.warn([Auth] Unauthorized role: ${decoded.role});
    //     return NextResponse.redirect(new URL("/unauthorized", request.url));
    // }

    // Token is valid - allow access
    console.info(`[Auth] Valid token for ${pathname}`);
    return NextResponse.next();
  } catch (error) {
    console.error(`
            [Auth] Token verification failed for ${pathname}:,
            error`);
    return redirectToLogin(request);
  }
}

/**
 * Configure which routes the middleware should protect
 *
 * This matcher excludes:
 * - /api/* - API routes
 * - /_next/static/* - Next.js static files
 * - /_next/image/* - Next.js image optimization
 * - /login, /verify-otp - Auth pages
 * - /.png, /.jpg, /.jpeg, /.gif, /.svg, /.ico - Image files
 * - /favicon.ico, /robots.txt, /sitemap.xml - Public files
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login, verify-otp (auth pages)
     * - Any file with common image/document extensions
     */
    // "/((?!api|_next/static|_next/image|favicon.ico|login|signup))",
    "/((?!login|signup))",
  ],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   console.log("Middleware running for:", request.nextUrl.pathname);

//   return NextResponse.next(); // allow the request
// }

// export const config = {
//   matcher: ["/:path*"], // apply to all routes
// };
