import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import emoji from "/login_emoji.jpg";
import image from "/login_image.jpg";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../../context/context";

const LoginPage = () => {
  const {setUser} = useUser()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          credentials: "include", // Include credentials
        });

        const data = await res.json();
        console.log("return from login", data);

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        toast.success("Login Successfull");
        // setUser(true)
        setFormData({
          username: "",
          password: "",
        });
        // navigate("/");
      } catch (error) {
        toast.error("Error in login");
        throw new Error(error);
      }
    },
    onSuccess: () => {
      // refetch the authUser
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen">
      <div className="flex-1 hidden lg:flex items-center justify-end">
        <img className="lg:w-90" src={image} alt="login-image" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <img className="w-24 lg:hidden" src={image} alt="login-image" />
          <h1 className="text-4xl font-extrabold text-black flex justify-center items-center">
            {"Can't"} Wait.
            <img className="w-24" src={emoji} />
          </h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>

          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="btn rounded-full btn-primary text-white">
            {isPending ? "Loading..." : "Login"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-black text-lg">{"Don't"} have an account?</p>
          <Link to="/signup">
            <button className="btn rounded-full btn-primary text-black btn-outline w-full">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
