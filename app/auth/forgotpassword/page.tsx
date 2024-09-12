import Image from "next/image";

const ForgotPassword = () => {
  return (
    <div className="flex bg-[#f2f2f2] ro flex-col h-dvh w-full justify-center items-center ">
      <div className="flex flex-col gap-4 w-1/4 ">
        <Image
          alt="logo"
          src="https://firebasestorage.googleapis.com/v0/b/authentication-e70b1.appspot.com/o/Screenshot%20from%202024-02-23%2018-47-57.png?alt=media&token=1fab8603-9b12-470e-935c-5ad02908eb14"
          width="0"
          height="0"
          sizes="100vw"
          className="w-64 h-auto place-self-center"
        />
        <div className="flex flex-col bg-white rounded-lg drop-shadow-md p-3 gap-10 justify-center ">
          <div className="w-full space-y-2">
            <label htmlFor="inputforgot" className="text-lg">
              Please enter your email
            </label>
            <input
              type="email"
              id="inputforgot"
              className="border w-full p-2 rounded focus:outline-none focus:border-blue-500"
            ></input>
          </div>
          <button className="bg-custom-green rounded-md text-white p-2">
            Send Reset Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
