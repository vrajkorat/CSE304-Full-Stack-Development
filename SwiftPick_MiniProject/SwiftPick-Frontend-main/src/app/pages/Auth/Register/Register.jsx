import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { api } from "../../../../utils/api";
import Layout from "../../../layout/Layout";

const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleinput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setRegister({ ...register, [name]: value });
  };
  const navigate = useNavigate();
  const Register = async (e) => {
    e?.preventDefault();
    try {
      const response = await fetch(`${api}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      });
      const data = await response.json();
      localStorage.setItem(
        "auth",
        JSON.stringify({ token: data.token, user: data.user })
      );
      console.log(data);
      if (data.success) {
        toast.success("Register successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Register");
    }
  };

  return (
    <>
      <Layout title="Registe-SwiftPick">
        <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-8 lg:px-8 w-">
          <div className="bg-white px-6 py-6 sm:max-w-[500px] w-full shadow-xl rounded-xl">
            <div className="sm:mx-auto sm:w-full  sm:max-w-sm flex flex-col gap-5">
              <img
                alt="Your Company"
                src="/img/mainlogo.png"
                className="mx-auto h-20 w-auto"
              />
              <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create a New Account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={(e) => Register(e)} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-start  text-sm font-medium leading-6 text-gray-900"
                  >
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      name="name"
                      required
                      type="text"
                      placeholder="Enter Name"
                      onChange={handleinput}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-start  text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      name="email"
                      placeholder="Enter Email"
                      required
                      type="Email"
                      onChange={handleinput}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="Password"
                    className="block text-start  text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      name="password"
                      required
                      placeholder="Enter Password"
                      type="Password"
                      onChange={handleinput}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="Phone"
                    className="block text-start  text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                      name="phone"
                      placeholder="Enter Phone Number"
                      required
                      type="number"
                      onChange={handleinput}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already a member?{" "}
                <Link
                  to="/Login"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Sign in Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Register;
