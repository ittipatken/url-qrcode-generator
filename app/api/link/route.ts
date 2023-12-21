import { auth } from '@/auth';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();
    const { url, keyword } = body;

    // Get IP address
    let ip = req.headers.get('x-real-ip');
    const forwardedFor = req.headers.get('x-forwarded-for');
    if (!ip && forwardedFor) {
      ip = forwardedFor.split(',').at(0) ?? null;
    }

    let title = req.headers.get('long-url-title') ?? url;
    title = decodeURI(title);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required.' },
        { status: 400 }
      );
    }

    if (!keyword) {
      return NextResponse.json(
        { success: false, error: 'Keyword is required.' },
        { status: 400 }
      );
    }

    const currentLink = await prismadb.link.findUnique({
      where: {
        keyword
      }
    });

    if (currentLink) {
      return NextResponse.json(
        { success: false, error: 'Please enter different keyword.' },
        { status: 400 }
      );
    }
    const link = await prismadb.link.create({
      data: {
        userId: session?.user?.id || '',
        title,
        keyword,
        url,
        ip: ip ?? 'Unknown'
      }
    });

    return NextResponse.json({ success: true, link });
  } catch (error: any) {
    console.log('[LINK_POST]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(_req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    const links = await prismadb.link.findMany({
      where: {
        userId: session?.user?.id
      }
    });

    return NextResponse.json(links);
  } catch (error: any) {
    console.log('[LINK_GET]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
