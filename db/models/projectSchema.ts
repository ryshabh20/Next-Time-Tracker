import mongoose, { Document, Model, ObjectId } from "mongoose";
import User from "./userSchema";
import Client from "./clientSchema";
import Employees from "./employeeSchema";
interface Iproject {
  projectname: string;
  adminId: ObjectId;
  client: ObjectId;
  clientname: string;
  technology: string;
  hoursAlloted: number;
  hoursConsumed?: number;
  hoursLeft?: number;
  description: string;
  assignedTeam: Array<string>;
  assignedMembers: Array<ObjectId>;
}
interface ProjectDocument extends Iproject, Document {
  createdAt: Date;
  updatedAt: Date;
}
const projectSchema = new mongoose.Schema<ProjectDocument>(
  {
    projectname: {
      type: String,
      required: [true, "Please provide a project name"],
      unique: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clients",
      required: [true, "Project should have a client Id"],
    },
    clientname: {
      type: "String",
      required: true,
    },
    technology: {
      type: String,
      required: true,
    },
    hoursAlloted: {
      type: Number,
      required: true,
    },
    hoursConsumed: {
      type: Number,
      default: 0,
    },
    hoursLeft: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    assignedTeam: [{ type: String, required: true }],
    assignedMembers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "employees" },
    ],
  },
  { timestamps: true }
);

const Project: Model<ProjectDocument> =
  mongoose.models.projects || mongoose.model("projects", projectSchema);

export default Project;
