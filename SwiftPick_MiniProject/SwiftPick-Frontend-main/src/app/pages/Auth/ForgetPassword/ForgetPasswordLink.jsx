import React, { useState } from "react";
import Layout from "../../../layout/Layout";
import { api } from "../../../../utils/api";
import { toast } from "react-toastify";

const ForgetPasswordLink = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${api}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
      toast.success("Password Reset Link sent Gmail SuccessFully");
    } catch (error) {
      console.error(error);
      setMessage("Error sending reset link");
    }
  };

  return (
    <Layout title="Forgot Password - SwiftPick">
      <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-8 lg:px-8">
        <div className="bg-white px-6 py-6 sm:max-w-[500px] w-full shadow-xl rounded-xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-5">
            <img
              alt="Your Company"
              src="/img/mainlogo.png"
              className="mx-auto h-20 w-auto"
            />
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Forgot Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-start text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send Reset Link
                </button>
              </div>
            </form>

            {message && (
              <p className="mt-4 text-center text-sm text-gray-500">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgetPasswordLink;
