import React, { useEffect, useState } from "react";
import { PaddingGiverHoc } from "../../components/hoc";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataLoaderAnimation } from "../../layout";
import { getOrdersAsync } from "./orderSlice";
import CircleIcon from "@mui/icons-material/Circle";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const TrackOrder = () => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderSummaryModel, SetOrderSummaryModel] = useState(null);
  console.log(
    "🚀 ~ file: TrackOrder.js:17 ~ TrackOrder ~ orderSummaryModel:",
    orderSummaryModel
  );
  const statusOfOrder = ["order placed", "shipped", "arrived", "delivered"];
  const [orders, SetOrders] = useState([]);
  const userorders = useSelector((state) => state.order.userorders);
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    if (userData && userData._id && userorders && userorders.length) {
      SetOrders(userorders);
    }
    window.scrollTo(0, 0);
  }, [userorders, userData]);
  useEffect(() => {
    if (userData && userData._id) {
      const orderInfo = {
        user: userData._id,
      };
      dispatch(getOrdersAsync(orderInfo));
    }
    window.scrollTo(0, 0);
  }, [userData]);

  const pending = useSelector((state) => state.order.pending);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return (
    <>
      <section className="max-sm:mt-[6rem] sm:mt-[7rem] lg:mt-[6rem] ">
        {orders && orders.length ? (
          [...orders].reverse().map((items, index) => {
            return (
              <>
                <div className="flex flex-col gap-4 shadow-lg my-4 p-8 rounded-md">
                  <div className="flex justify-between items-center shadow-sm">
                    <div className=" flex gap-4 flex-wrap items-center">
                      <h1 className="font-bold text-lg sm:text-2xl lg:text-4xl">
                        Order #54879
                      </h1>
                      <button
                        onClick={() => {
                          SetOrderSummaryModel(items);
                          setOpen(true);
                        }}
                        className="text-blue-600 sm:text-xs lg:text-sm"
                      >
                        View invoice →
                      </button>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1 flex-wrap max-sm:text-[13px] sm:text-[13px] lg:text-[17px] items-center justify-center">
                      <p className="font-normal items-cente text-center ">
                        Order placed
                      </p>
                      <p className="mx-2 font-semibold text-center">
                        {new Date(items.createdAt).toLocaleTimeString(
                          "en-US",
                          options
                        )}
                      </p>
                    </div>
                  </div>
                  <Transition.Root show={open} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      initialFocus={cancelButtonRef}
                      onClose={setOpen}
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 transition-opacity" />
                      </Transition.Child>

                      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <CheckCircleIcon
                                      className="h-6 w-6 text-red-600"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div className="w-full mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <Dialog.Title
                                      as="h3"
                                      className="text-base font-semibold leading-6 text-gray-900"
                                    >
                                      Order Summary
                                    </Dialog.Title>
                                    <div className="mt-4 flex col w-full ">
                                      <div className="border-b flex w-full justify-between pb-4">
                                        <p className="text-opacity-100 text-gray-700">
                                          Subtotal
                                        </p>
                                        <p className="text-opacity-100 text-gray-500">
                                          $
                                          {orderSummaryModel &&
                                            orderSummaryModel.products &&
                                            orderSummaryModel.products.length &&
                                            orderSummaryModel.products.reduce(
                                              (acc, CurrItem) => {
                                                return acc + CurrItem.subtotal;
                                              },
                                              0
                                            )}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="mt-4 flex col w-full ">
                                      <div className="border-b flex w-full justify-between pb-4">
                                        <p className="text-opacity-100 text-gray-700">
                                          Shipping
                                        </p>
                                        <p className="text-opacity-100 text-gray-500">
                                          $8
                                        </p>
                                      </div>
                                    </div>
                                    <div className="mt-4 flex col w-full ">
                                      <div className="border-b flex w-full justify-between pb-4">
                                        <p className="text-opacity-100 text-gray-700">
                                          Tax
                                        </p>
                                        <p className="text-opacity-100 text-gray-500">
                                          $0.00
                                        </p>
                                      </div>
                                    </div>
                                    <div className="mt-4 flex col w-full ">
                                      <div className="border-b flex w-full justify-between pb-4">
                                        <p className="text-black">
                                          Order total
                                        </p>
                                        <p className="text-blue-700">
                                          ${" "}
                                          {orderSummaryModel &&
                                            orderSummaryModel.products &&
                                            orderSummaryModel.products.length &&
                                            orderSummaryModel.products.reduce(
                                              (acc, CurrItem) => {
                                                return acc + CurrItem.subtotal;
                                              },
                                              0
                                            ) + 8}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                  type="button"
                                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                  onClick={() => setOpen(false)}
                                  ref={cancelButtonRef}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition.Root>
                  {items &&
                    items.products &&
                    items.products.length &&
                    items.products.map((value) => {
                      return (
                        <>
                          <div className="border shadow-sm py-4 px-4 mt-5 flex flex-wrap gap-4 justify-start lg:justify-center items-start bg-gray-100 bg-opacity-100 rounded-md">
                            <div className=" rounded-xl overflow-hidden shadow-xl ">
                              <img
                                src={value.productData.thumbnail}
                                className=" lg:h-[10rem] lg:w-[10rem]"
                              />
                            </div>
                            <div className="flex w-[30rem] flex-col  gap-2">
                              <h1 className="font-normal font-rubik">
                                {" "}
                                {items.address.user.firstname}{" "}
                                {items.address.user.lastname}
                              </h1>
                              <h1 className="font-normal ">
                                ${Number(value.productData.price).toFixed(2, 2)}{" "}
                                * {value.quantity}{" "}
                                <span className="font-normal text-[14px] text-gray-700 text-opacity-70">
                                  (Qty)
                                </span>
                              </h1>
                              <p className="font-normal text-[14px] text-gray-700 text-opacity-70">
                                <span className="font-semibold">Subtotal</span>:
                                ${Number(value.subtotal).toFixed(2, 2)}
                              </p>
                              <p className="font-normal text-[14px] text-gray-700 text-opacity-70">
                                This durable and portable insulated tumbler will
                                keep your beverage at the perfect temperature
                                during your next adventure.
                              </p>
                            </div>
                            <div className="flex w-[15rem] flex-col gap-2">
                              <h2 className="font-normal font-rubik">
                                Delivery address
                              </h2>
                              <div className="font-normal text-[14px] text-gray-700 text-opacity-70">
                                <p>{items.address.street}</p>
                                <p>
                                  {items.address.city},{" "}
                                  <span>{items.address.state}</span>{" "}
                                </p>
                                <p>
                                  {items.address.country},{" "}
                                  <span>{items.address.zipCode}</span>{" "}
                                </p>
                                <p>{items.address.contact}</p>
                              </div>
                            </div>
                            <div className="flex  w-[15rem] flex-col gap-2">
                              <h1 className="font-normal font-rubik">
                                Shipping updates
                              </h1>
                              <div className="font-normal text-[14px] text-gray-700 text-opacity-70">
                                <p>{items.address.street}</p>
                                <p>
                                  {items.address.city},{" "}
                                  <span>{items.address.state}</span>{" "}
                                </p>
                                <p>
                                  {items.address.country},{" "}
                                  <span>{items.address.zipCode}</span>{" "}
                                </p>
                                <p>{items.address.contact}</p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}

                  <div className="flex justify-center items-center mx-auto w-full">
                    <ol class="flex items-center w-full justify-center">
                      {statusOfOrder &&
                        statusOfOrder.map((status, index) => {
                          return (
                            <div key={status} className="w-full flex-col">
                              <div className="flex w-full">
                                <li
                                  class={`flex w-full items-center  text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block ${
                                    statusOfOrder.indexOf(items.orderstatus) >
                                    index
                                      ? "dark:after:border-blue-600"
                                      : null
                                  } `}
                                >
                                  <span class=" flex items-center justify-center bg-blue-100 rounded-full  0 shrink-0 lg:h-8 lg:w-8  w-10 h-10 max-md:h-4 max-md:w-4">
                                    <CircleIcon
                                      className={` max-md:h-2 max-md:w-2 text-blue-600 ${
                                        items.orderstatus == status
                                          ? "animate-ping"
                                          : null
                                      }`}
                                    />
                                  </span>
                                </li>
                              </div>
                              <div>
                                <p
                                  className={`text-xs md:block max-sm:text-[12px] max-mobileSize:text-[9px] capitalize ${
                                    items.orderstatus == status
                                      ? "text-blue-600"
                                      : null
                                  }`}
                                >
                                  {status}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </ol>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <div className="mt-[5rem]">
            {pending ? (
              <div role="status mx-auto">
                <DataLoaderAnimation />
              </div>
            ) : (
              <>
                <p className="mt-6 text-xl text-center leading-7 text-gray-600">
                  No orders found
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => navigate(-1)}
                  >
                    Explore products
                  </a>
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default PaddingGiverHoc(TrackOrder);
