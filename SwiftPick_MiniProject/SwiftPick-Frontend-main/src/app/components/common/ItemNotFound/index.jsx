import React from "react";
import { Link } from "react-router-dom";

const NotFound = ({ empty, title, redirect }) => {
  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-medium text-gray-900">{empty}</h2>
        <p className="mt-1 text-gray-500">{title}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="flex items-center justify-center  rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            {redirect}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
