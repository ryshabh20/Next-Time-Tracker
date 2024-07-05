import bcryptjs from "bcryptjs";

const saltAndHashPassword = async (password: any) => {
  // const salt = await bcryptjs.genSalt(10);
  // const hashedPassword = await bcryptjs.hash(password, salt);
  return password;
};

export default saltAndHashPassword;
