import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request) {
  let jwt_token = request.cookies.get('jwt_token');
  if (jwt_token) {
    const apiEndpoint = `${process.env.API_URL}admin/CheckAccount`;

    try {
      const requestBody = {
        token: process.env.MYKEY,
      };

      const apiResponse = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();

        if (data.error) {
          console.log('Error in API response:', data.error);
          return NextResponse.redirect(new URL('/Login', request.url));
        } else {
          console.log(data)
          const response = NextResponse.next();
          console.log('Setting cookie with apiData:', data);

          // Clear the existing cookie
          response.cookies.delete('api_data', { path: '/' });

          // Set the new cookie
          response.cookies.set('api_data', JSON.stringify(data), { path: '/', httpOnly: true, secure: true });

          return response;
        }
      } else {
        console.log('API response not ok:', apiResponse.status);
        return NextResponse.redirect(new URL('/Login', request.url));
      }
    } catch (error) {
      console.log('Error in middleware:', error);
      return NextResponse.redirect(new URL('/Login', request.url));
    }
  } else {
    console.log('No JWT token found');
    return NextResponse.redirect(new URL('/Login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
