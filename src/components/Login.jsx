import React from "react";
import { useAppContext } from "../context/Appcontext";

const Login = () => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setshowUserLogin, setuser } = useAppContext();

  const onSubmithandler = async (event) => {
    event.preventDefault();
    setshowUserLogin({
      email: "test@gmail.com",
      name: "test",
    });
    setshowUserLogin(false);
  };

  return (
    <div
      onClick={() => setshowUserLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <form
        onSubmit={onSubmithandler}
        onClick={(e) => e.stopPropagation()}
        className="relative z-50 flex flex-col gap-4 p-8 py-12 w-80 text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <button
          type="button"
          onClick={() => setshowUserLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
        >
          &times;
        </button>
        <p className="text-2xl font-medium text-center">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        )}

        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
