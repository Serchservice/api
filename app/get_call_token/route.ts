
import { CharacterCheckers } from "@/exports";
import { RtcRole, RtcTokenBuilder } from "agora-token";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    {params} : {
        params: {
            channel: string,
            serch_id: string
        }
    }
) {
    if(request.url.includes("channel") && request.url.includes("user_call_id")) {
        var channelIndex = request.url.indexOf("channel");
        var user_call_idIndex = request.url.indexOf("user_call_id");

        // Extract the query part of the URL
        const queryString = request.url.split('?')[1];
        // Split the query string into key-value pairs
        const queryParams = queryString.split('&');

        // Initialize variables to store the values of channel and user_call_id
        let channelName, userCallID;

        // Loop through the key-value pairs to find channel and user_call_id
        for (const param of queryParams) {
            const [key, value] = param.split('=');
            if (key === "channel") {
                channelName = value;
            } else if (key === "user_call_id") {
                userCallID = value;
            }
        }

        // token expire time, hardcode to 3600 seconds = 1 hour
        var expirationTimeInSeconds = 3600
        var currentTimestamp = Math.floor(Date.now() / 1000)
        var privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

        if(channelName != null || userCallID != null) {
            if(CharacterCheckers.containsOnlyIntegers(userCallID!)) {
                var key = RtcTokenBuilder.buildTokenWithUid(
                    process.env.APPID!,
                    process.env.CERTIFICATE!,
                    channelName!,
                    userCallID!,
                    RtcRole.PUBLISHER,
                    expirationTimeInSeconds,
                    privilegeExpiredTs
                );

                return NextResponse.json({
                    url: request.url,
                    channel_index: channelIndex,
                    user_call_id_index: user_call_idIndex,
                    code: 200,
                    channel_name: channelName,
                    user_call_id: userCallID,
                    status: "Success",
                    token: key
                })
            } else {
                return NextResponse.json({
                    code: 400,
                    status: "Needed type was not given",
                    message: "The user call id contains non-integers"
                })
            }
        } else {
            return NextResponse.json({
                code: 300,
                status: "Null value was passed",
                message: "Channel name or the user call id is null"
            })
        }
    } else {
        return NextResponse.json({
            code: 100,
            status: "Error",
            message: "Link is not formatted correctly"
        })
    }
}