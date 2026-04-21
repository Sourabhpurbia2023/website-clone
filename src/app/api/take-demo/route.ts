import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { validateLeadForm } from '@/lib/leadValidation';
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

    const { values, errors } = validateLeadForm({
      name: body.name ?? '',
      email: body.email ?? '',
      phone: body.number ?? body.phone ?? '',
      message: body.message ?? '',
    });

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: 'Please fix the highlighted fields.', fieldErrors: errors },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const created = await ClientTakeaDemoDetails.create({
      name: values.name,
      email: values.email,
      number: values.phone,
      message: values.message,
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
