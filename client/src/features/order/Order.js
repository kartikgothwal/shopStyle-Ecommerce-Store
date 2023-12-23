import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataLoaderAnimation, PageNotFound } from "../../layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Address from "../address/Address";
import { deleteAddressAsync } from "../address/addressSlice";
import { toast } from "react-toastify";
import { PaddingGiverHoc } from "../../components/hoc";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [choosenAddress, SetChoosenAddress] = useState(null);
  const [user, SetUser] = useState(null);
  const userData = useSelector((state) => state.user.userData);
  const cartStoreValue = useSelector((state) => state.cart.cartvalue);
  const cartDataPending = useSelector((state) => state.cart.pending);
  const userAddress = useSelector((state) => state.address.useraddress);
  const addressPending = useSelector((state) => state.address.pending);
  useEffect(() => {
    SetUser(userData);
    window.scrollTo(0, 0);
  }, [userData]);

  const handleSavedAddressRemove = (e, addressID) => {
    e.preventDefault();
    dispatch(deleteAddressAsync(addressID));
  };
  const handlePlaceOrderClick = (e) => {
    e.preventDefault();
    if (!choosenAddress) {
      return toast.warn("Please add and choose an address first", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    alert("Thank you");
  };
  return (
    <>
      {user && user._id ? (
        <>
          {cartStoreValue && cartStoreValue.length ? (
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
                        <span className="font-semibold text-gray-900">
                          Shop
                        </span>
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
                        <span className="font-semibold text-gray-900">
                          Shipping
                        </span>
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
                        <span className="font-semibold text-gray-500">
                          Payment
                        </span>
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
                    {cartStoreValue && cartStoreValue.length ? (
                      cartStoreValue.map((item) => {
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
                                  navigate(
                                    `/productoverview/${item.product._id}`
                                  )
                                }
                              />{" "}
                            </div>

                            <div className="flex w-full flex-col px-4 py-4">
                              <span
                                className="font-semibold text-lg cursor-pointer"
                                onClick={() =>
                                  navigate(
                                    `/productoverview/${item.product._id}`
                                  )
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
                    ) : (
                      <>
                        {cartDataPending &&
                          new Array(2).fill(undefined).map((values, index) => {
                            <div className="relative flex w-full animate-pulse gap-2 p-4 border">
                              <div className="h-12 w-12 rounded- bg-slate-400"></div>
                              <div className="flex-1">
                                <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                                <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
                              </div>
                              <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
                            </div>;
                          })}
                      </>
                    )}
                  </div>

                  <p className="mt-8 text-lg font-medium">Saved Addresses</p>
                  <form className="mt-5 grid gap-6">
                    {userAddress && userAddress.length ? (
                      userAddress.map((addressItem) => {
                        return (
                          <div
                            key={addressItem._id}
                            className={`relative cursor-pointer  `}
                            onClick={() => SetChoosenAddress(addressItem)}
                          >
                            <input
                              className="peer hidden"
                              id="radio_1"
                              type="radio"
                              name="radio"
                              checked={
                                choosenAddress &&
                                choosenAddress._id == addressItem._id
                              }
                            />
                            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                            <label
                              className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                              htmlFor={`radio_${addressItem._id}`}
                            >
                              <img
                                className="w-14 object-contain"
                                src="/images/naorrAeygcJzX0SyNI4Y0.png"
                                alt=""
                              />
                              <div className="ml-5">
                                <span className="mt-2 font-semibold">
                                  {user && user.firstname + " " + user.lastname}
                                </span>
                                <p className="text-slate-500 text-sm leading-6">
                                  {addressItem.street}
                                </p>
                                <p className="text-slate-500 text-sm leading-6">
                                  {addressItem.city}, {addressItem.state}
                                </p>
                                <p className="text-slate-500 text-sm leading-6">
                                  {addressItem.country}, {addressItem.zipCode}
                                </p>
                                <p className="text-slate-500 text-sm leading-6">
                                  {addressItem.contact}
                                </p>
                                <button
                                  className="mt-4 flex mb-8 w-[4rem] rounded-md bg-transparent  px-1 py-1 font-medium text-blue-600"
                                  onClick={(e) =>
                                    handleSavedAddressRemove(e, addressItem._id)
                                  }
                                >
                                  <span>Remove</span>
                                </button>
                              </div>
                            </label>
                          </div>
                        );
                      })
                    ) : (
                      <>
                        {addressPending ? (
                          <div className="relative flex w-full animate-pulse gap-2 p-4 border">
                            <div className="h-12 w-12 rounded-full bg-slate-400"></div>
                            <div className="flex-1">
                              <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
                              <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
                            </div>
                            <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
                          </div>
                        ) : (
                          <p>No Saved Address</p>
                        )}
                      </>
                    )}
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
                      <p className="text-sm font-medium text-gray-900">
                        Subtotal
                      </p>
                      <p className="font-semibold text-gray-900">
                        ${" "}
                        {cartStoreValue &&
                          cartStoreValue
                            .reduce((acc, currEle) => {
                              return (
                                acc + currEle.product.price * currEle.quantity
                              );
                            }, 0)
                            .toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        Shipping
                      </p>
                      <p className="font-semibold text-gray-900">$8.00</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        Grand Total
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        ${" "}
                        {cartStoreValue &&
                          (
                            cartStoreValue.reduce((acc, currEle) => {
                              return (
                                acc + currEle.product.price * currEle.quantity
                              );
                            }, 0) + 8
                          ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    className="mt-4 w-full bg-neutral-950 text-neutral-400 border border-neutral-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                    onClick={(e) => handlePlaceOrderClick(e)}
                  >
                    <span className="bg-neutral-400 shadow-neutral-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                    Place Order
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <>
              {cartDataPending ? (
                <div className="mt-[6rem] lg:mt-[6rem] ">
                  <DataLoaderAnimation />
                </div>
              ) : (
                <PageNotFound
                  message="No Items in cart"
                  items={"Please add items to the before checkout"}
                />
              )}
            </>
          )}
        </>
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
