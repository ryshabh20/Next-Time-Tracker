import mongoose, { Document, Model } from "mongoose";
import { ObjectId } from "mongoose";
import User from "./userSchema";
import Project from "./projectSchema";

interface IEmployee {
  employeename: string;
  code: string;
  designation: string;
  department: string;
  technologies: string[];
  permission: string[];
  createdBy: ObjectId;
  email: string;
}

interface EmployeeDocument extends IEmployee, Document {
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema = new mongoose.Schema<EmployeeDocument>({
  employeename: {
    type: String,
    required: true,
  },

  code: {
    type: String,
    unique: true,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  permission: {
    type: [String],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const Employee: Model<EmployeeDocument> =
  mongoose.models.employees || mongoose.model("employees", employeeSchema);

export default Employee;
