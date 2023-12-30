import React, { useEffect, useState } from "react";
import { PaddingGiverHoc } from "../../components/hoc";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataLoaderAnimation } from "../../layout";
import { getOrdersAsync } from "./orderSlice";

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
  useEffect(() => {
    console.log("🚀 ~ file: TrackOrder.js:12 ~ TrackOrder ~ orders:", orders);
  }, [orders]);
  const pending = useSelector((state) => state.order.pending);
  return (
    <>
      <section className="max-sm:mt-[6rem] sm:mt-[7rem] lg:mt-[6rem] ">
        {orders && orders.length ? (
          orders.map((items) => {
            return (
              <>
                <div className="flex flex-col gap-4 shadow-lg my-4  p-8 rounded-md">
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
                        March 22, 2021
                      </p>
                    </div>
                  </div>
                  {items &&
                    items.products &&
                    items.products.length &&
                    items.products.map((value) => {
                      return (
                        <>
                          <div className="border shadow-sm py-4 mt-5 flex flex-wrap gap-4 justify-start lg:justify-center items-start bg-gray-100 bg-opacity-100 rounded-md">
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
                                * {value.quantity}
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
                            <div className="flex   w-[15rem] flex-col gap-2">
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
