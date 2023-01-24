import { NextApiResponse } from "next";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { isValidToken, isValidTokenAPI } from "./utils/jwt";

export async function middleware(request: NextRequest, response: NextApiResponse<any>, ev: NextFetchEvent) {

    const token = request.cookies.get('token')?.value?.toString();

    const loginURL = new URL('/login', request.url);
    loginURL.searchParams.set('p', request.nextUrl.pathname);
    const indexURL = new URL('/', request.url);

    if ( request.nextUrl.pathname.startsWith('/login') ) {
        if ( !token )  return NextResponse.next();

        try {
            await isValidToken( token );
            return NextResponse.redirect( indexURL );
        } catch (error) {
            return NextResponse.next();
        }        
    }


    if ( !token ) return NextResponse.redirect( loginURL );

    try {
        const payload = await isValidToken( token );
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect( loginURL );
    }

}
export const config = {
    matcher: [  
        "/",
        "/login",
        "/api",
        "/users",
        "/users/areas/",
        "/users/companies/",
        "/inspections",
        "/inspections/:id*",
    ],
};