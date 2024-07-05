import { connect } from "@/db/dbConfig";
import User from "@/db/models/userSchema";

import bcryptjs from "bcryptjs";

connect();
const getUserFromDb = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email }).select([
      "name",
      "avatar",
      "role",
      "email",
      "team",
      "password",
    ]);

    if (!user) {
      return null;
    }
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return null;
    }

    return user;
  } catch (error: any) {
    console.log(error);
    // throw new Error("Error while fetching user from db");
  }
};

export default getUserFromDb;
