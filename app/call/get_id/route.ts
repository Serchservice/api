import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const content = request.body;
    const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;

    return NextResponse.json({
        response: content
    })
    // const options = {
    //     method: "POST",
    //     headers: { Authorization: token, "Content-Type": "application/json" },
    //     body: JSON.stringify({ region }),
    // };

}