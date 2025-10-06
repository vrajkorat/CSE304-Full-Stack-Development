import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import FetchcartData from "../../../utils/CartData";
import Token from "../.../../../../utils/Token";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { api } from "../.../../../../utils/api";
import Layout from "../../layout/Layout";
import CreateAddressForm from "../../components/address/CreateAddressForm";
import AddressData from "../../components/address/AddressCard";
import CartLoader from "../../components/common/Loader/CartLoader";

const Checkout = () => {
  const [Address, setAddress] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    postcode: "",
    country: "india",
  });
  const token = Token();

  const [Addressdata, setAddressdata] = useState([]);
  const [productdata, setProductsData] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const [total, setTotal] = useState(0);
  const [paymentmethod, setPaymentMethod] = useState("cash");
  const [checkoutloader, setCheckoutLoader] = useState(true);

  const getcartproduct = async () => {
    setCheckoutLoader(true);
    try {
      const data = await FetchcartData(token);
      if (data.success) {
        setCheckoutLoader(false);
      }
      setProductsData(data?.cart?.products);

      const subtotal = data.cart.products.reduce((accumulator, product) => {
        return (accumulator +=
          product?.product?.pricediscount * product.quantity);
      }, 0);
      setTotal(subtotal);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcartproduct();

    // eslint-disable-next-line
  }, []);

  const handleinput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddress({ ...Address, [name]: value });
  };

  const handlecountry = (e) => {
    const selectedcountry = e.target.value;
    setAddress((prev) => {
      return {
        ...prev,
        country: selectedcountry,
      };
    });
  };

  const handledetail = (address) => {
    setSelectedAddress(address);
  };

  useEffect(() => {
    handledetail(Addressdata[0]);
  }, [Addressdata]);

  //select paymentmethod
  const handlepayment = (name) => {
    setPaymentMethod(name);
  };

  //create a new address
  const createAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${api}/api/v1/Address/newaddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.token,
        },
        body: JSON.stringify(Address),
      });
      const data = await res.json();
      if (data.success) {
        console.log(data);

        getaddress();
        setAddress({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          streetAddress: "",
          city: "",
          state: "",
          postcode: "",
          country: "india",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get addresss
  const getaddress = async () => {
    try {
      const res = await fetch(`${api}/api/v1/Address/getaddress`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.token,
        },
      });
      const data = await res.json();
      setAddressdata(data.Address);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setAddress({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      streetAddress: "",
      city: "",
      state: "",
      postcode: "",
      country: "india",
    });
  };

  useEffect(() => {
    if (token.token) {
      getaddress();
    }
    // eslint-disable-next-line
  }, [token.token]);

  //delete address
  const deleteAddress = async (id, e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${api}/api/v1/Address/deleteaddress/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.token,
        },
      });
      const data = await res.json();

      if (data.success) {
        getaddress();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //create order
  const Order = async () => {
    try {
      const res = await fetch(`${api}/api/v1/Order/neworder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.token,
        },
        body: JSON.stringify({
          products: productdata,
          address: selectedAddress,
          paymentMethod: paymentmethod,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Order Placed Successfully");
      }
      if (paymentmethod === "card") {
        const stripe = await loadStripe(
          "pk_test_51Q0zMXIdk8DdaDV07FA0FesFbYcY5V18iSXxnnQbhRLFN3064Y0mGw53Qj4n1Zvyilu1nECnjln6c3LeOHUmdYh900GEA5s4K7"
        );
        await stripe.redirectToCheckout({
          sessionId: data?.sessionId,
        });
      }
    } catch (error) {
      console.log("Error in placing order: ", error);
    }
  };
  return (
    <>
      <Layout title="Checkout-SwiftPick">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 mg:grid-cols-2 py-8">
            <div>
              <form className="bg-white px-5 py-12 mt-12 ">
                <div className="space-y-12">
                  <div className="border-b  text-start border-gray-900/10 pb-8">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <CreateAddressForm
                        handleinput={handleinput}
                        Address={Address}
                        handlecountry={handlecountry}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-4">
                    <button
                      type="button"
                      className="text-sm px-3 py-2.5 rounded-md bg-gray-100 font-semibold leading-6 text-gray-900"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                    <button
                      onClick={createAddress}
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12 text-start">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Address
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {Addressdata.length
                        ? "Choose From Existing Address"
                        : "No existing address found. Please add a new one."}
                    </p>
                    <ul>
                      {Addressdata?.map((address, i) => {
                        const isChecked = i === 0;
                        return (
                          <AddressData
                            key={i}
                            Address={address}
                            isChecked={isChecked}
                            handledetail={handledetail}
                            deleteAddress={deleteAddress}
                          />
                        );
                      })}
                    </ul>

                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Payment Methods
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Choose One
                        </p>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              id="cash"
                              name="payments"
                              type="radio"
                              defaultChecked
                              onChange={() => handlepayment("cash")}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="cash"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              id="card"
                              name="payments"
                              type="radio"
                              onChange={() => handlepayment("card")}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="card"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Card Payment
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className=" ">
              <div className="mx-auto bg-white shadow-lg max-w-7xl mt-0 mg:mt-12 px-0 sm:px-0 lg:px-0 ">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8  ">
                  <h1 className="text-4xl text-start my-4   font-bold tracking-tight text-gray-900">
                    Cart
                  </h1>
                  {checkoutloader ? (
                    <CartLoader />
                  ) : (
                    <div className="flow-root">
                      <ul className="divide-y  divide-gray-200">
                        {productdata?.map((products) => {
                          return (
                            <li
                              key={products.product?._id}
                              className="flex py-6"
                            >
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt="Productimg"
                                  src={products.product?.thumbnail[0]}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col ">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <p>{products.product?.name}</p>
                                    </h3>
                                    <p className="ml-4">
                                      ${products.product?.pricediscount}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {/* {p.color} */}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className=" text-gray-500">
                                    <label
                                      htmlFor="quantity"
                                      className="mr-5 inline  text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Qty : {products?.quantity}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    {checkoutloader ? (
                      <div className="animate-pulse w-full">
                        {/* Subtotal Skeleton */}
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <div className="h-4 bg-gray-200 rounded-full w-20"></div>
                          <div className="h-4 bg-gray-200 rounded-full w-24 sm:w-32 lg:w-40"></div>
                        </div>

                        {/* Shipping and Taxes Info Skeleton */}
                        <div className="mt-0.5">
                          <div className="h-3 bg-gray-200 rounded-full w-48"></div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p>Subtotal</p>
                        <p>${total}</p>
                      </>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={Order}
                      className="flex items-center w-full shadow-md shadow-indigo-400 justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700"
                    >
                      {paymentmethod === "card"
                        ? "Pay And Order"
                        : "Confirm Order "}
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      <Link to="/">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Checkout;
