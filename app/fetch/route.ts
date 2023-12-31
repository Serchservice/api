import { NextResponse } from "next/server";
// api.serchservice.com/fetch?key=google

export async function GET(request: Request,
    {params} : {
        params: {
            key: string,
        }
    }
) {
    if(request.url.includes("key")) {
        var link = request.url;
        var secret = link.split("=");
        var key;

        if(secret[1] === "google") {
            key = process.env.GOOGLEMAPKEY;
        } else if(secret[1] === "anon") {
            key = process.env.SUPABASEANON;
        } else if(secret[1] === "url") {
            key = process.env.SUPABASEURL;
        } else if(secret[1] === "appid") {
            key = process.env.APPID;
        } else if(secret[1] === "signal") {
            key = process.env.FCM;
        }

        return NextResponse.json({
            key: key?.replaceAll(" ", ""),
            link: link,
            secret: secret,
            code: 200,
            status: "Success"
        })
    } else {
        return NextResponse.json({
            link: request.url,
            code: 100,
            status: "Error"
        })
    }
}