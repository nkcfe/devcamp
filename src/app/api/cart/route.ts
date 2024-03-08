import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import prisma from '@/db';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const cartItems = await prisma.cartItem.findMany({})
    } catch (error) {
      
    }
    return NextResponse.json('logged in');
  } else {

    return NextResponse.json('Not logged in');
  }
}

export async function POST(request: Request) {
  
}

export async function PUT(request: Request) {
  return new Response('Hello, world!');
}

export async function DELETE(request: Request) {
  return new Response('Hello, world!');
}
