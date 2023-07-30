import jwt from 'jsonwebtoken';

interface UserJwtPayload {
    jti: string,
    iat: number
}

export const getJwtSecretKey = () => {
    const secret = process.env.VIDEOSECRET

    if(!secret || secret.length === 0) {
        throw new Error("No environment variable named JWT")
    }

    return secret
}

export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwt.verify(
            token,
            getJwtSecretKey()
        );
        return verified as UserJwtPayload
    } catch (error) {
        throw new Error("Token has expired")
    }
}

// export const signJwt = async (
//     payload: string | object | Buffer,
//     secret: string,
//     options?: undefined
// ) => {
//     const result = await new SignJWT({})
//         .setProtectedHeader({
//             alg: 'HS256',
//         })
//         .setExpirationTime('120m')
//         .sign(
//             new TextEncoder().encode(getJwtSecretKey()),
//             options
//         )
// }