import { SerchUtils } from "@/exports";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = request.body;

    const message = {
        "data": {
            //
        },
        "token": "",
        "priority": "high"
    }

    SerchUtils.firebaseMessaging().send(message).then((response) => {
        return NextResponse.json({
            body: response,
            status: "Success",
            code: 200
        })
    }).catch((error) => {
        return NextResponse.json({
            body: error,
            status: "Error",
            code: 100
        })
    })
}