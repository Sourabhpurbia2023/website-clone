import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const ClientTakeaDemoDetailsSchema = new Schema(
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
    collection: 'ClientTakeaDemoDetails',
  }
);

export type ClientTakeaDemoDetailsDocument = InferSchemaType<typeof ClientTakeaDemoDetailsSchema>;

const ClientTakeaDemoDetails =
  (mongoose.models.ClientTakeaDemoDetails as Model<ClientTakeaDemoDetailsDocument>) ||
  mongoose.model<ClientTakeaDemoDetailsDocument>('ClientTakeaDemoDetails', ClientTakeaDemoDetailsSchema);

export default ClientTakeaDemoDetails;
