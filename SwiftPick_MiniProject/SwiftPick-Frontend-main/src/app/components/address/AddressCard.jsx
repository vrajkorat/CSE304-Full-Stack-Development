import React from "react";

const AddressData = ({ Address, isChecked, handledetail, deleteAddress }) => {
  return (
    <>
      <li
        key={Address._id}
        className="flex justify-between gap-x-9 mt-4  py-5 border-2 px-5"
      >
        <div className="flex min-w-0 gap-x-4 ">
          <input
            id={`Address-${Address._id}`}
            name="Address"
            type="radio"
            defaultChecked={isChecked}
            onChange={() => handledetail(Address)}
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {Address.firstname}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {Address.streetaddress}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {Address.postcode}
            </p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <button onClick={(e) => deleteAddress(Address._id, e)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <p className="text-sm leading-6 text-gray-900">{Address.phone}</p>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            {Address.country}
          </p>
        </div>
      </li>
    </>
  );
};

export default AddressData;
