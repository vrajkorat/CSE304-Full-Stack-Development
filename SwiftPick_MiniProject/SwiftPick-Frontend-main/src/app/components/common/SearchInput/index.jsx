import React from "react";
import { useSearch } from "../../../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { api } from "../../../../utils/api";

const Searchinput = () => {
  const { values, setvalues } = useSearch();

  const navigate = useNavigate();

  const searchProduct = async (e) => {
    e?.preventDefault();
    try {
      const res = await fetch(`${api}/api/v1/search-item/${values.keyword}`);

      const data = await res.json();

      setvalues({ ...values, results: data.products });

      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" ">
        <form onSubmit={searchProduct}>
          <label
            htmlFor="default-search"
            className=" text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div className="flex">
            <input
              type="search"
              value={values.keyword}
              onChange={(e) =>
                setvalues({ ...values, keyword: e.target.value })
              }
              className="block tracking-wide max-sm:w-48 w-sm mg:w-full text-md text-black  rounded-l-md border border-black-300  px-5 focus:ring-indigo-500 focus:border-indigo-500  dark:border-gray-600 font-semibold dark:placeholder-black dark:text-black dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="Search Products…"
            />
            <button
              type="submit"
              className=" text-white text-center right-2.5 bottom-1.5 top-1.5 rounded-r-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold   shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <IoSearchSharp className="text-lg " />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Searchinput;
