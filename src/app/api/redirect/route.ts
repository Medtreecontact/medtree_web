import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode');

  if (!mode) {
    return new Response(JSON.stringify({ error: 'Mode is required' }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Construct the full URL for redirection
  const baseUrl = request.nextUrl.origin;

  if (mode === 'resetPassword') {
    const redirectUrl = `${baseUrl}/reset-password?${searchParams.toString()}`;
    return NextResponse.redirect(redirectUrl, 302);
  } if (mode === 'verifyEmail') {
    const redirectUrl = `${baseUrl}/verify-email?${searchParams.toString()}`;
    return NextResponse.redirect(redirectUrl, 302);
  } else {
    console.log("mode : ", mode);
    return new Response(JSON.stringify({ error: 'Invalid mode' }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}