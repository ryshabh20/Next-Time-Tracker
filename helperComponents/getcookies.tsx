import { cookies } from "next/headers";

const GetCookie = async () => {
  return cookies()?.get("authjs.session-token")?.value ?? "";
};

export default GetCookie;
