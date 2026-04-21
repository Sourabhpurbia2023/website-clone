import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { validateLeadForm } from '@/lib/leadValidation';
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

    const created = await Contactus.create({
      name: values.name,
      email: values.email,
      number: values.phone,
      message: values.message,
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