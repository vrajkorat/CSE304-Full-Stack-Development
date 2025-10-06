import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NotFound from "../../components/common/ItemNotFound";
import Token from "../../../utils/Token";
import FetchcartData from "../../../utils/CartData";
import { useCart } from "../../../context/CartContext";
import { api } from "../../../utils/api";
import Layout from "../../layout/Layout";
import CartLoader from "../../components/common/Loader/CartLoader";

export function Cart() {
  const token = Token();
  const { setcart } = useCart();
  const [productsdata, setProductData] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartloader, setCartLoader] = useState(true);

  const getcartProduct = async () => {
    setCartLoader(true);
    const data = await FetchcartData(token);
    if (data.success) {
      setCartLoader(false);
    }
    const subtotal = data?.cart?.products?.reduce((accumulator, product) => {
      return (accumulator +=
        product?.product?.pricediscount * product.quantity);
    }, 0);
    setTotal(subtotal);
    setProductData(data?.cart?.products);
    setcart(data?.cart?.products?.length);
  };

  useEffect(() => {
    getcartProduct();

    // eslint-disable-next-line
  }, []);

  const filterCart = async (productid, quantity) => {
    try {
      await fetch(`${api}/api/v1/cart/filtercart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.token,
        },
        body: JSON.stringify({ pid: productid, nquantity: quantity }),
      });
      getcartProduct();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title="Cart-SwiftPick">
        <div className="mx-auto bg-white max-w-7xl  shadow-lg mt-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-4xl text-start my-4 font-bold tracking-tight text-gray-900">
              Cart
            </h1>
            {token?.token ? (
              productsdata?.length > 0 && !cartloader ? (
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {productsdata?.map((products, id) => {
                      return (
                        <li key={id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={products.product?.thumbnail[0]}
                              alt={products.product?.thumbnail[0]}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={products.product?.href}>
                                    {products.product?.name}
                                  </a>
                                </h3>
                                <p className="ml-4">
                                  ${" "}
                                  {(
                                    products.product?.pricediscount *
                                    products.quantity
                                  ).toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="mr-5 inline text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty:{products.quantity}
                                </label>
                                <select
                                  value={
                                    products.quantity ? products.quantity : 1
                                  }
                                  onChange={(e) => {
                                    const newQuantity = parseInt(
                                      e.target.value
                                    );
                                    filterCart(products._id, newQuantity);
                                  }}
                                >
                                  {[1, 2, 3, 4, 5].map((qty) => (
                                    <option key={qty} value={qty}>
                                      {qty}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                  onClick={() =>
                                    filterCart(products.product._id)
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : cartloader ? (
                <CartLoader />
              ) : (
                <>
                  <div className="flex justify-center items-center">
                    <NotFound
                      empty="Your cart is empty"
                      title="Add products to your cart to see them here."
                      redirect=" Continue Shopping"
                    />
                  </div>
                </>
              )
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-medium text-gray-900">
                  Please log in
                </h2>
                <p className="mt-1 text-gray-500">
                  You need to log in to see your cart items.
                </p>
                <div className="mt-6">
                  <Link
                    to="/login"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            )}
          </div>

          {token?.token && productsdata?.length > 0 && (
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {cartloader ? (
                <div className="animate-pulse">
                  {/* Subtotal Skeleton */}
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <div className="h-4 bg-gray-200 rounded-full w-20"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-12"></div>
                  </div>

                  {/* Shipping and Taxes Info Skeleton */}
                  <div className="mt-0.5">
                    <div className="h-3 bg-gray-200 rounded-full w-48"></div>
                  </div>
                </div>
              ) : (
                <>
                  {" "}
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>$ {total}
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                </>
              )}
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
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
          )}
        </div>
      </Layout>
    </>
  );
}
