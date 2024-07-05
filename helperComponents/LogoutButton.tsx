import { signOut } from "@/auth";

const LogoutButton = () => {
  return (
    <button
      onClick={() => {
        signOut();
      }}
      className=" bg-custom-green m-2  text-white hover:text-black p-3 text-xl"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
