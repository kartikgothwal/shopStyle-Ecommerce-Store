import React, { useEffect, useState } from "react";
import { PaddingGiverHoc } from "../../components/hoc";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataLoaderAnimation } from "../../layout";
import { getOrdersAsync } from "./orderSlice";
import CircleIcon from "@mui/icons-material/Circle";
const TrackOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orders, SetOrders] = useState([]);
  const userorders = useSelector((state) => state.order.userorders);
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    if (userData && userData._id && userorders && userorders.length) {
      SetOrders(userorders);
    }
  }, [userorders, userData]);
  useEffect(() => {
    if (userData && userData._id) {
      const orderInfo = {
        user: userData._id,
      };
      dispatch(getOrdersAsync(orderInfo));
    }
  }, [userData]);

  const pending = useSelector((state) => state.order.pending);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return (
    <>
      <section className="max-sm:mt-[6rem] sm:mt-[7rem] lg:mt-[6rem] ">
        {orders && orders.length ? (
          [...orders].reverse().map((items) => {
            console.log(
              "🚀 ~ file: TrackOrder.js:36 ~ orders.map ~ items:",
              items
            );
            return (
              <>
                <div className="flex flex-col gap-4 shadow-lg my-4 p-8 rounded-md   ">
                  <div className="flex justify-between items-center shadow-sm">
                    <div className=" flex gap-4 flex-wrap items-center">
                      <h1 className="font-bold text-lg sm:text-2xl lg:text-4xl">
                        Order #54879
                      </h1>
                      <NavLink
                        to={""}
                        className="text-blue-600 sm:text-xs lg:text-sm"
                      >
                        View invoice →
                      </NavLink>
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
                  <div className="flex justify-center items-center border-4">
                    <ol class="flex items-center w-full justify-center">
                      <div className="w-full flex-col">
                        <div className="flex w-full">
                          <li class="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                            <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-8 lg:w-8 0 shrink-0">
                              <CircleIcon />
                            </span>
                          </li>
                        </div>
                        <div>
                          <p className="text-xs md:block hidden">
                            Order Placed
                          </p>
                        </div>
                      </div>
                      <div className="w-full flex-col">
                        <div className="flex w-full">
                          <li class="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                            <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-8 lg:w-8 0 shrink-0">
                              <CircleIcon />
                            </span>
                          </li>
                        </div>
                        <div>
                          <p className="text-xs md:block hidden">
                            Ready to Ship
                          </p>
                        </div>
                      </div>
                      <div className="w-full flex-col">
                        <div className="flex w-full">
                          <li class="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                            <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-8 lg:w-8 0 shrink-0">
                              <CircleIcon />
                            </span>
                          </li>
                        </div>
                        <div>
                          <p className="text-xs md:block hidden">
                            Arrived at facility
                          </p>
                        </div>
                      </div>
                      <div className="w-full flex-col">
                        <div className="flex w-full">
                          <li className="bg">
                            <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-8 lg:w-8 0 shrink-0">
                              <CircleIcon className="text-blue-500" />
                            </span>
                          </li>
                        </div>
                        <div>
                          <p className="text-xs md:block hidden">
                            Ready for Delivery
                          </p>
                        </div>
                      </div>
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
