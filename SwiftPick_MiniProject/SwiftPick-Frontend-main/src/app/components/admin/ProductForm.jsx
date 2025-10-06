import React from "react";
import { IoCloudUploadSharp } from "react-icons/io5";

const ProductForm = ({ data, handleinput, createproduct, id, handlefile }) => {
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <img alt="Your Company" src="/img/mainlogo.png" className="mx-auto h-20 w-auto" />
        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {id ? "Update" : "Create New"} Product
        </h2>
      </div>

      <div className="mt-10 w-full">
        <form className="space-y-6" onSubmit={createproduct}>
          <div>
            <label
              htmlFor="name"
              className="text-start text-sm font-medium leading-6 text-gray-900"
            >
              Product Name
            </label>
            <div className="mt-2">
              <input
                name="name"
                required
                type="text"
                onChange={handleinput}
                value={data.name}
                placeholder="Enter Product Name"
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-start  text-sm font-medium leading-6 text-gray-900"
            >
              description
            </label>
            <div className="mt-2">
              <input
                name="description"
                placeholder="Enter description"
                required
                onChange={handleinput}
                type="text"
                value={data.description}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-start  text-sm font-medium leading-6 text-gray-900"
            >
              price
            </label>
            <div className="mt-2">
              <input
                name="price"
                onChange={handleinput}
                required
                placeholder="Enter price"
                type="number"
                value={data.price}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="pricediscount"
              className="block text-start  text-sm font-medium leading-6 text-gray-900"
            >
              pricediscount
            </label>
            <div className="mt-2">
              <input
                onChange={handleinput}
                name="pricediscount"
                placeholder="Enter pricediscount Number"
                required
                type="number"
                value={data.pricediscount}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="brand"
              className="block text-start  text-sm font-medium leading-6 text-gray-900"
            >
              brand
            </label>
            <div className="mt-2">
              <input
                onChange={handleinput}
                name="brand"
                required
                type="text"
                value={data.brand}
                placeholder="Enter brand"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-start  text-sm font-medium leading-6 text-gray-900"
            >
              category
            </label>
            <div className="mt-2">
              <input
                onChange={handleinput}
                name="category"
                required
                type="text"
                value={data.category}
                placeholder="Enter category"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="thumbnail "
              className="block text-start py-2  text-sm font-medium leading-6 text-gray-900"
            >
              thumbnails
            </label>

            <div className="flex items-center justify-center w-fit px-5 py-2 my-auto text-white  rounded-lg cursor-pointer focus-within:outline-none bg-indigo-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 shadow-lg hover:shadow-indigo-400 transition duration-300 ease-in-out">
              <IoCloudUploadSharp className="h-6 w-6 text-white mr-3" />
              <label className="cursor-pointer">
                <span className="font-semibold text-white">Upload Thumbnails</span>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handlefile}
                  multiple
                  required
                  className="hidden" 
                />
              </label>
            </div>
          </div>
          <div>
            <label
              htmlFor="rating"
              className="block text-start  text-sm font-medium leading-6 text-gray-900"
            >
              rating
            </label>
            <div className="mt-2">
              <input
                name="rating"
                required
                onChange={handleinput}
                type="text"
                value={data.rating}
                placeholder="Enter rating"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-start  text-sm font-medium leading-6 text-gray-900"
            >
              stock
            </label>
            <div className="mt-2">
              <input
                name="stock"
                onChange={handleinput}
                required
                type="text"
                value={data.stock}
                placeholder="Enter a stock number"
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
              {id ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
