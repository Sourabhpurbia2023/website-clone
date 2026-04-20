import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Contactus from '@/models/Contactus';

export const runtime = 'nodejs';

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  number?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const name = body.name?.trim() ?? '';
    const email = body.email?.trim() ?? '';
    const number = (body.number ?? body.phone ?? '').trim();
    const message = body.message?.trim() ?? '';

    if (!name || !email || !number) {
      return NextResponse.json(
        { success: false, message: 'Name, Email, and Number are required.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const created = await Contactus.create({
      name,
      email,
      number,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        id: created._id,
        message: 'Thanks for contacting us. We will contact you soon.',
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected server error';
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}