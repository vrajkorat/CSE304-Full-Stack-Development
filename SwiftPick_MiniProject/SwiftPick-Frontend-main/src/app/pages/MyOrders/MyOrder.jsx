import React, { useEffect, useState } from "react";
import Token from "../../../utils/Token";
import { toast } from "react-toastify";
import NotFound from "../../components/common/ItemNotFound";
import { api,  } from "../../../utils/api";
import Layout from "../../layout/Layout";


const MyOrder = () => {
  const [orderData, setorderData] = useState([]);
  const token = Token();
  const cancelorder = async (pid) => {
    try {
      const res = await fetch(
        `${api}/api/v1/Order/cancelorder`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token.token,
          },
          body: JSON.stringify({ orderId: pid }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Order cancelled successfully");
        getorders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getorders = async () => {
    try {
      const response = await fetch(
        `${api}/api/v1/Order/getorder`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token.token,
          },
        }
      );

      const data = await response.json();
      setorderData(data.order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getorders();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout tittle="YourOrder-SwiftPick">
      <div className=" my-8 w-full max-w-7xl mx-auto   px-4 py-14 sm:px-6 lg:px-8 bg-white   ">
        <h1 className=" text-2xl font-bold">My Orders</h1>
        <div className=""> 
          {orderData.length === 0 ? (
            <div className="flex justify-center">
              <div className="py-6 mg:w-1/4">
                <NotFound empty="No Order placed" redirect="Continue Shopping" />
              </div>
            </div>
          ) : (
            <>
              <ul className="my-4 divide-y divide-gray-200">
                {orderData?.map((order,index) => {
                  return (
                    <div key={index}>
                      {order?.products.map((product) => {
                        return (
                          <li key={product?.product?._id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product?.product?.thumbnail[0]}
                                alt={product?.product?.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 w-full flex justify-between">
                              <div>
                                <div className="n text-base font-medium text-gray-900">
                                  <h3>
                                    <p>{product?.product?.name}</p>
                                  </h3>
                                </div>
                                <div>
                                  <h4>
                                    <p>
                                      status:{" "}
                                      {order.status === "Pending" ? (
                                        <>🟠 {order.status}</>
                                      ) : (
                                        <>🔴{order.status}</>
                                      )}
                                    </p>
                                  </h4>
                                  <p className="text-green-600">
                                    ${product?.product?.price}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="text-gray-500">
                                    <label
                                      htmlFor="quantity"
                                      className="mr-5 inline text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Qty: {product?.quantity}
                                    </label>
                                  </div>
                                </div>
                                {order.status === "Pending" ? (
                                  <button
                                    onClick={() => cancelorder(order._id)}
                                    className="px-4 py-1 my-2 text-md font-medium bg-red-500 text-white hover:bg-red-400 rounded text-center"
                                  >
                                    cancel
                                  </button>
                                ) : (
                                  null
                                )}
                              </div> 
                              <div className="text-end text-[15px] flex flex-col justify-end items-end gap-1">
                                <p>
                                  {order.address.firstname}{" "}
                                  {order.address.lastname}
                                </p>
                                <p>{order.address.email}</p>
                                <p>{order.address.phone}</p>
                                <p>
                                  {order.address.streetAddress},{" "}
                                  {order.address.city}, {order.address.state} -{" "}
                                  {order.address.postcode}
                                </p>
                                <p>{order.address.country}</p>
                                <span className="text-green-500  bg-green-50  font-medium w-fit spanx-3 py-1 px-2  rounded   ">
                                  {order.paymentMethod === "card"
                                    ? "Paid "
                                    : "Cash on Delivery"}
                                </span>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </div>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyOrder;
