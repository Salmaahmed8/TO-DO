import mongoose from "mongoose";

interface ITask extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  deletedAt?: Date | null;
}

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }, // Soft delete field
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
