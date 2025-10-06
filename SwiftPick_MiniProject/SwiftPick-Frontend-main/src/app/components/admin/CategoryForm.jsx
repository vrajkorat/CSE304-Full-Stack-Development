import React from "react";

const CategoryForm = ({ handleSubmit, handleinput, value, id }) => {
  return (
    <div className="w-full px-4  ">
      <div className="flex flex-col gap-5  text-center ">
        <h2 className="text-2xl font-bold  text-gray-800">
          {id ? "Update" : "Create"} Category
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 w-full flex justify-center items-center  gap-8">
          <div className="w-full ">
            {" "}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
             Category Name
            </label>
            <input
              type="text"
              name="name"
              value={value}
              onChange={handleinput}
              placeholder="Enter Category Name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                 sm:text-sm sm:leading-6"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="mt-6 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {id ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
