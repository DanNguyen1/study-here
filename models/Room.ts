import mongoose from "mongoose";

export interface Rooms extends mongoose.Document {
  name: string;
  capacity: number;
  location: string;
  available: boolean;
  amenities: string[];
}

const RoomSchema = new mongoose.Schema<Rooms>({
  name: {

    type: String,
  },
  capacity: {
    type: Number,
  },
  location: {
    type: String,
  },
  available: {
    type: Boolean,
  },
  amenities: {
    type: [String],
  }
});

export default mongoose.models.Room || mongoose.model<Rooms>("Room", RoomSchema);