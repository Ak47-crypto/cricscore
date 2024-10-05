import mongoose, { Schema, Document } from "mongoose";

export interface IMatch extends Document {
  name: string;
  team: [Schema.Types.ObjectId, Schema.Types.ObjectId];
  innings: number;
  runs:number;
  delivery: number;
  ball: number;
  date: Date;
  venue: string;
  result: string;
}
const MatchSchema: Schema<IMatch> = new Schema({
  name: {
    type: String,
    required: true,
  },
  team: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
  ],
  innings: {
    type: Number,
  },
  runs:{
    type:Number
  },
  delivery: {
    type: Number,
  },
  ball: {
    type: Number,
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    default: "pending",
  },
});

export default mongoose.model<IMatch>("MatchModel", MatchSchema);
