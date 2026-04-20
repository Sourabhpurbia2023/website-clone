import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ClientTakeaDemoDetails from '@/models/ClientTakeaDemoDetails';

export const runtime = 'nodejs';

type TakeDemoPayload = {
  name?: string;
  email?: string;
  phone?: string;
  number?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TakeDemoPayload;

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

    const created = await ClientTakeaDemoDetails.create({
      name,
      email,
      number,
      message,
    });

    const redirectUrl =
      process.env.VISAFLOW_DEMO_URL?.trim() ||
      process.env.NEXT_PUBLIC_VISAFLOW_DEMO_URL?.trim() ||
      '';

    if (!redirectUrl) {
      return NextResponse.json(
        {
          success: false,
          message: 'Demo URL is not configured. Set NEXT_PUBLIC_VISAFLOW_DEMO_URL or VISAFLOW_DEMO_URL.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, id: created._id, redirectUrl },
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
