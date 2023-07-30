import { verifyAuth } from "@/exports";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("serch_id")?.value;

    const verifiedToken = token && await verifyAuth(token).catch((error) => {
        console.log(error);
    })

    if(request.nextUrl.pathname.startsWith("/") && !verifiedToken) {
        return
    }

    const url = request.url

    if(url.includes("/home") && verifiedToken) {
        return NextResponse.redirect(new URL("/home", url))
    }

    if(!verifiedToken) {
        if(request.nextUrl.pathname.startsWith("/admin")) {
            return NextResponse.json({
                error: "Authentication is required",
                code: 101
            })
        }

        return NextResponse.redirect(new URL("/", url))
    }
}

export const config = {
    matcher: [
        "/pay",
        "/call",
        "/notify"
    ]
}