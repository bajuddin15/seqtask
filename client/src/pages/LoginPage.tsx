import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http//:localhost:4000/api/v1/auth/", {
        email,
        password,
      });
      if (data && data?.success) {
        localStorage.setItem("token", data?.data?.token);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full md:w-[400px] shadow-md border border-gray-300 p-5 space-y-4"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="email">Email address *</label>
          <input
            className="border border-gray-300 focus:ring-1 focus:ring-blue-500 py-2 px-3 rounded-md outline-none"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password">Password *</label>
          <input
            className="border border-gray-300 focus:ring-1 focus:ring-blue-500 py-2 px-3 rounded-md outline-none"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="py-2 bg-blue-500 hover:bg-blue-600 rounded-md w-full text-white font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
