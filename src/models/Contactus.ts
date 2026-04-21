import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';
import { EMAIL_PATTERN, PHONE_PATTERN } from '@/lib/leadValidation';

const ContactusSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: EMAIL_PATTERN,
    },
    number: {
      type: String,
      required: true,
      trim: true,
      match: PHONE_PATTERN,
    },
    message: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'Contactus',
  }
);

export type ContactusDocument = InferSchemaType<typeof ContactusSchema>;

const Contactus =
  (mongoose.models.Contactus as Model<ContactusDocument>) ||
  mongoose.model<ContactusDocument>('Contactus', ContactusSchema);

export default Contactus;