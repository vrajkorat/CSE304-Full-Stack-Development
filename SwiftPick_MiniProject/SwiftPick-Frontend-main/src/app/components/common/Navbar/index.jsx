import React, { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { MdDashboard } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import Token from "../../../../utils/Token";

import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import FetchcartData from "../../../../utils/CartData";
import Searchinput from "../SearchInput";
import { useCart } from "../../../../context/CartContext";

const Navbar = ({ children }) => {
  const token = Token();
  const { cart, setcart } = useCart();
  const [isLogin, setIsLogin] = useState(token?.token ? true : false);

  const getcartProduct = async () => {
    const data = await FetchcartData(token);

    setcart(data?.cart?.products?.length);
  };

  useEffect(() => {
    getcartProduct();

    // eslint-disable-next-line
  }, []);

  const handleinput = () => {
    localStorage.removeItem("auth");
    setIsLogin(false);
    toast.success("Logged out successfully!");
  };

  return (
    <>
      <div className="">
        <Disclosure
          as="nav"
          className="bg-white sticky top-0 w-full z-10 shadow-sm shadow-gray-500"
        >
          {/* logo main */}
          <div className="">
            <div className="flex h-16 items-center justify-between px-3">
              <div className="flex items-center ">
                <div className="flex ">
                  <Link to="/">
                    <img src="/img/lOGO.png" alt="logo" className="h-10 " />
                  </Link>
                </div>
              </div>

              <div className=" hidden mg:block  ">
                <div className="flex gap-4">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "py-1.5 px-4 bg-indigo-200 text-indigo-500 font-semibold rounded"
                        : "py-1.5 px-4 hover:bg-gray-200 text-black font-semibold rounded"
                    }
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "py-1.5 px-4 bg-indigo-200 text-indigo-500 font-semibold rounded"
                        : "py-1.5 px-4 hover:bg-gray-200 text-black font-semibold rounded"
                    }
                  >
                    Contact
                  </NavLink>

                  <NavLink
                    to="/services"
                    className={({ isActive }) =>
                      isActive
                        ? "py-1.5 px-4 bg-indigo-200 text-indigo-500 font-semibold rounded"
                        : "py-1.5 px-4 hover:bg-gray-200 text-black font-semibold rounded"
                    }
                  >
                    Services
                  </NavLink>
                </div>
              </div>

              {/* laptop screen */}
              <div className="hidden mg:block">
                <div className="flex items-center gap-6 ">
                  <Searchinput />
                  <Link to="/cart">
                    <button
                      type="button"
                      className="relative rounded-full py-2 text-gray-400 hover:text-black focus:outline-none  focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="inline-flex items-center rounded-full bottom-5  absolute  bg-gray-50 px-2.5 py-1 text-sm font-medium text-black ring-1 ring-inset ring-gray-500/10">
                        {cart ? cart : "0"}
                      </span>
                      <ShoppingCartIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-black"
                      />
                    </button>
                  </Link>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative">
                    <div>
                      <MenuButton
                        className={`relative flex max-w-xs items-center rounded-full text-sm ring-2 ring-offset-2 ring-offset-gray-800`}
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt="userimg"
                          src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                          className="h-8 w-8 rounded-full"
                        />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {isLogin === true ? (
                        <>
                          <MenuItem className="  sm:px-3">
                            <NavLink
                              to="/dashboard"
                              className=" block ml-1 py-2 text-sm text-black font-medium data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              <h1 className="flex  items-center gap-2">
                                {" "}
                                <MdDashboard className="text-xl text-indigo-500" />
                                Dashboard
                              </h1>
                            </NavLink>
                          </MenuItem>
                          <MenuItem>
                            <NavLink
                              to="/YourOrder"
                              className="block px-4 py-2 text-sm text-black font-medium data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              <h1 className="flex  items-center gap-2">
                                {" "}
                                <MdOutlineFavoriteBorder className="text-xl text-indigo-500" />
                                My Orders
                              </h1>
                            </NavLink>
                          </MenuItem>
                          <MenuItem>
                            <NavLink
                              to="/"
                              onClick={handleinput}
                              className="block px-4 py-2 text-sm text-black font-medium data-[focus]:bg-gray-100 data-[focus]:text-gray-900 border-t border-indigo-400"
                            >
                              <h1 className="flex  items-center gap-2">
                                {" "}
                                <FiLogOut className="text-xl text-red-500" />
                                Logout
                              </h1>
                            </NavLink>
                          </MenuItem>
                        </>
                      ) : (
                        <div className="flex flex-col">
                          <MenuItem>
                            <NavLink
                              to="/register"
                              className="block px-4 py-2 text-sm text-black font-medium data-[focus]:bg-gray-100 data-[focus]:text-gray-900 "
                            >
                              <h1 className="flex  items-center gap-2">
                                {" "}
                                Register
                              </h1>
                            </NavLink>
                          </MenuItem>
                          <MenuItem>
                            <NavLink
                              to="/login"
                              className="block px-4 py-2 text-sm text-black font-medium data-[focus]:bg-gray-100 data-[focus]:text-gray-900 "
                            >
                              <h1 className="flex  items-center gap-2">
                                {" "}
                                Login
                              </h1>
                            </NavLink>
                          </MenuItem>
                        </div>
                      )}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              {/* laptop screen */}

              {/* mobile screen  */}
              <div className="flex mg:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md   bg-white p-1.5 text-indigo-500 border-2 border-indigo-500 ">
                  <span className="absolute bottom-10" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 font-bold group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="block mg:hidden">
            <div className="border-t border-gray-700  pb-3 ">
              <div className="flex items-center justify-stretch w-full px-2.5 py-4">
                <div className="w-full sm:w-auto flex-grow">
                  <div className="text-sm font-medium leading-none text-black">
                    <Searchinput />
                  </div>
                </div>

                <Menu>
                  <div className="flex justify-end w-full gap-5">
                    <div>
                      <Link to="/cart">
                        <button
                          type="button"
                          className="relative rounded-full py-2 text-gray-400 hover:text-black focus:outline-none  focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="inline-flex items-center rounded-full bottom-6 absolute -z-20 bg-gray-50 px-2.5 py-1 text-sm font-medium text-black ring-1 ring-inset ring-gray-500/10">
                            {cart ? cart : "0"}
                          </span>
                          <ShoppingCartIcon
                            aria-hidden="true"
                            className="h-6 w-6 text-black"
                          />
                        </button>
                      </Link>
                    </div>
                    <div>
                      <MenuButton
                        className={`relative flex max-w-xs items-center rounded-full text-sm ring-2 ring-offset-2 ring-offset-gray-800`}
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt="userimg"
                          src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                          className="h-8 w-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-6 top-28 z-10  mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {isLogin === true ? (
                      <>
                        <MenuItem className=" ">
                          <NavLink
                            to="/dashboard"
                            className=" block ml-1 py-2 text-sm text-black font-medium data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            <h1 className="flex  items-center gap-2">
                              {" "}
                              <MdDashboard className="text-xl text-indigo-500" />
                              Dashboard
                            </h1>
                          </NavLink>
                        </MenuItem>
                        <MenuItem>
                          <NavLink
                            to="/YourOrder"
                            className="block ml-1  py-2 text-sm text-black font-medium data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            <h1 className="flex  items-center gap-2">
                              {" "}
                              <MdOutlineFavoriteBorder className="text-xl text-indigo-500" />
                              My Orders
                            </h1>
                          </NavLink>
                        </MenuItem>
                        <MenuItem>
                          <NavLink
                            to="/"
                            onClick={handleinput}
                            className="block ml-2 py-2 text-sm text-black font-medium data-[focus]:bg-gray-100 data-[focus]:text-gray-900 border-t border-indigo-400"
                          >
                            <h1 className="flex  items-center gap-2">
                              {" "}
                              <FiLogOut className="text-xl text-red-500" />
                              Logout
                            </h1>
                          </NavLink>
                        </MenuItem>
                      </>
                    ) : (
                      <div className="flex flex-col">
                        <MenuItem>
                          <NavLink
                            to="/register"
                            className="block px-4 py-2 text-sm text-black font-medium data-[focus]:bg-gray-100 data-[focus]:text-gray-900 "
                          >
                            <h1 className="flex  items-center gap-2">
                              {" "}
                              Register
                            </h1>
                          </NavLink>
                        </MenuItem>
                        <MenuItem>
                          <NavLink
                            to="/login"
                            className="block px-4 py-2 text-sm text-black font-medium data-[focus]:bg-gray-100 data-[focus]:text-gray-900 "
                          >
                            <h1 className="flex  items-center gap-2"> Login</h1>
                          </NavLink>
                        </MenuItem>
                      </div>
                    )}
                  </MenuItems>
                </Menu>
              </div>
              <div className="   ">
                <div className="flex items-center justify-center gap-4 py-2">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "py-1.5 px-4 bg-indigo-200 text-indigo-500 font-semibold rounded"
                        : "py-1.5 px-4 hover:bg-gray-50 bg-indigo-100 text-indigo-500 font-semibold rounded"
                    }
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "py-1.5 px-4 bg-indigo-200 text-indigo-500 font-semibold rounded"
                        : "py-1.5 px-4 hover:bg-gray-50 bg-indigo-100 text-indigo-500 font-semibold rounded"
                    }
                  >
                    Contact
                  </NavLink>

                  <NavLink
                    to="/services"
                    className={({ isActive }) =>
                      isActive
                        ? "py-1.5 px-4 bg-indigo-200 text-indigo-500 font-semibold rounded"
                        : "py-1.5 px-4 hover:bg-gray-50 bg-indigo-100 text-indigo-500 font-semibold rounded"
                    }
                  >
                    Services
                  </NavLink>
                </div>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <main>
          <div className="  ">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Navbar;
