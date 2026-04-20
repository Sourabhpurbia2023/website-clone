import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

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
    },
    number: {
      type: String,
      required: true,
      trim: true,
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