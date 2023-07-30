import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

// api.serchservice.com/call/get_token

export async function GET(
    request: Request,
    {params} : {
        params: {
            channel: string,
            serch_id: string
        }
    }
) {
    const SECRET_KEY = process.env.VIDEO_SDK_SECRET;
    const API_KEY = process.env.VIDEO_SDK_API

    if(SECRET_KEY != null && API_KEY != null){
        const token = jwt.sign(
            {
                apikey: API_KEY,
                permissions: [`allow_join`, `ask_join` , `allow_mod`],
            },
            SECRET_KEY,
            {
                expiresIn: '120m',
                algorithm: 'HS256'
            }
        )

        return NextResponse.json({
            code: 200,
            status: "Success",
            token: token
        })
    } else {
        return NextResponse.json({
            code: 100,
            status: "Error",
            token: null
        })
    }
}