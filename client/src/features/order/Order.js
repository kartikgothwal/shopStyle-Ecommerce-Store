import React, { useEffect, useState } from "react";
import { PaddingGiverHoc } from "../../components/hoc";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageNotFound } from "../../layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Address from "../address/Address";

const Order = () => {
  const navigate = useNavigate();
  const [user, SetUser] = useState(null);
  const userData = useSelector((state) => state.user.userData);
  const cartStoreValue = useSelector((state) => state.cart.cartvalue);
  useEffect(() => {
    console.log("userdata mil gaya", userData);
    SetUser(userData);
  }, [userData]);

  return (
    <>
      {user && user._id ? (
        <section className="mt-[6rem] lg:mt-[6rem] ">
          <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
            <a href="#" className="text-2xl font-bold text-gray-800">
              Checkout
            </a>
            <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
              <div className="relative">
                <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                  <li className="flex items-center space-x-3 text-left sm:space-x-4">
                    <a
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </a>
                    <span className="font-semibold text-gray-900">Shop</span>
                  </li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <li className="flex items-center space-x-3 text-left sm:space-x-4">
                    <a
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                      href="#"
                    >
                      2
                    </a>
                    <span className="font-semibold text-gray-900">Shipping</span>
                  </li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <li className="flex items-center space-x-3 text-left sm:space-x-4">
                    <a
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                      href="#"
                    >
                      3
                    </a>
                    <span className="font-semibold text-gray-500">Payment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
            <div className="px-4 pt-8">
              <p className="text-xl font-medium">Order Summary</p>
              <p className="text-gray-400">
                Check your items. And select a suitable shipping method.
              </p>
              <button
                className="mt-4 flex mb-8 w-[4rem] rounded-md bg-transparent  px-1 py-1 font-medium text-blue-600"
                onClick={() => navigate(-1)}
              >
                <ArrowBackIcon />
                <span>Back</span>
              </button>
              <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                {cartStoreValue && cartStoreValue.length
                  ? cartStoreValue.map((item) => {
                      return (
                        <div
                          key={item._id}
                          className="flex flex-col rounded-lg bg-white sm:flex-row"
                        >
                          <div className="h-24 w-28">
                            {" "}
                            <img
                              className="m-2 h-full w-full rounded-md border object-contain object-center cursor-pointer"
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              onClick={() =>
                                navigate(`/productoverview/${item.product._id}`)
                              }
                            />{" "}
                          </div>

                          <div className="flex w-full flex-col px-4 py-4">
                            <span
                              className="font-semibold text-lg cursor-pointer"
                              onClick={() =>
                                navigate(`/productoverview/${item.product._id}`)
                              }
                            >
                              {item.product.title}
                            </span>
                            <span className="float-right sm:text-sm text-sm   text-gray-400">
                              ${item.product.price}*{item.quantity}
                            </span>
                            <p className="sm:text-base text-sm  font-semibold">
                              Subtotal: ${" "}
                              {Number(
                                item.product.price * item.quantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>

              <p className="mt-8 text-lg font-medium">Saved Addresses</p>
              <form className="mt-5 grid gap-6">
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_1"
                    type="radio"
                    name="radio"
                    checked
                  />
                  <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    htmlFor="radio_1"
                  >
                    <img
                      className="w-14 object-contain"
                      src="/images/naorrAeygcJzX0SyNI4Y0.png"
                      alt=""
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">Fedex Delivery</span>
                      <p className="text-slate-500 text-sm leading-6">
                        Delivery: 2-4 Days
                      </p>
                    </div>
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_2"
                    type="radio"
                    name="radio"
                    checked
                  />
                  <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    htmlFor="radio_2"
                  >
                    <img
                      className="w-14 object-contain"
                      src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                      alt=""
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">Fedex Delivery</span>
                      <p className="text-slate-500 text-sm leading-6">
                        Delivery: 2-4 Days
                      </p>
                    </div>
                  </label>
                </div>
              </form>
            </div>
            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
              <p className="text-xl font-medium">Order Details</p>
              <p className="text-gray-400">
                Complete your order by providing your order details.
              </p>

              <Address valid={true} />
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">
                    ${" "}
                    {cartStoreValue &&
                      cartStoreValue
                        .reduce((acc, currEle) => {
                          return acc + currEle.product.price * currEle.quantity;
                        }, 0)
                        .toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">$8.00</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Grand Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${" "}
                    {cartStoreValue &&
                      (
                        cartStoreValue.reduce((acc, currEle) => {
                          return acc + currEle.product.price * currEle.quantity;
                        }, 0) + 8
                      ).toFixed(2)}
                  </p>
                </div>
              </div>
              <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                Place Order
              </button>
            </div>
          </div>
        </section>
      ) : (
        <PageNotFound
          message="Unauthorized Access"
          items={"You don't have the permission to access this page"}
        />
      )}
    </>
  );
};

export default PaddingGiverHoc(Order);
