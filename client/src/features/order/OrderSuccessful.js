import { PaddingGiverHoc } from "../../components/hoc";
import { user } from "../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAsync } from "./orderSlice";
import { isEqual } from "lodash";
import { DataLoaderAnimation, PageNotFound } from "../../layout";
import { removeCartAsync } from "../cart/cartSlice";
import HomeIcon from "@mui/icons-material/Home";
import CallIcon from "@mui/icons-material/Call";
const OrderSuccessful = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const orderInfo = location.state;
  const previousOrderInfo = useRef(null);
  const userorders = useSelector((state) => state.order.userorders);
  const userData = useSelector((state) => state.user.userData);
  const order = useSelector((state) => state.order);
  useEffect(() => {
    if (
      orderInfo &&
      !isEqual(orderInfo, previousOrderInfo.current) &&
      userData._id
    ) {
      dispatch(getOrdersAsync(orderInfo));
      if (userData._id) {
        dispatch(removeCartAsync({ userID: userData._id }));
      }
      previousOrderInfo.current = orderInfo;
    }
    window.scrollTo(0, 0);
  }, [orderInfo, userData]);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return (
    <>
      {userorders && userorders.length && userData ? (
        <section className="mt-[4rem] lg:mt-[4rem] ">
          {" "}
          <div>
            <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
              <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl  lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                  Thanks for ordering
                </h1>
                <p className="text-base   font-medium leading-6 text-gray-600">
                  {new Date(userorders[0].createdAt).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </p>
              </div>
              <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                  <div className="flex flex-col justify-start items-start   bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                    <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                      Customer’s Cart
                    </p>
                    {userorders &&
                      userorders[0].products.map((items) => {
                        return (
                          <>
                            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                              <div className="pb-4 md:pb-8 w-full md:w-40">
                                <img
                                  className="w-full hidden md:block"
                                  src={items.productData.thumbnail}
                                  alt={items.productData.title}
                                />
                                <img
                                  className="w-full md:hidden"
                                  src={items.productData.thumbnail}
                                  alt={items.productData.title}
                                />
                              </div>
                              <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                  <h3 className="text-lg   xl:text-xl font-semibold leading-6 text-gray-800">
                                    {items.productData.title}
                                  </h3>
                                  <div className="flex justify-start items-start flex-col space-y-2">
                                    <p className="text-sm leading-none text-gray-800">
                                      <span className=" text-gray-600">
                                        Style:{" "}
                                      </span>{" "}
                                      Italic Minimal Design
                                    </p>
                                    <p className="text-sm leading-none text-gray-800">
                                      <span className=" text-gray-600">
                                        Size:{" "}
                                      </span>{" "}
                                      Small
                                    </p>
                                    <p className="text-sm leading-none text-gray-800">
                                      <span className=" text-gray-600">
                                        Color:{" "}
                                      </span>{" "}
                                      Light Blue
                                    </p>
                                  </div>
                                </div>
                                <div className="flex justify-between space-x-8 items-start w-full">
                                  <p className="text-base xl:text-base leading-6">
                                    $
                                    {Number(items.productData.price).toFixed(2)}{" "}
                                    <span className="text-red-300 line-through">
                                      {" "}
                                      ${" "}
                                      {Number(
                                        items.productData.price + 20
                                      ).toFixed(2)}
                                    </span>
                                  </p>
                                  <p className="text-base xl:text-base leading-6 text-gray-800">
                                    0{items.quantity}
                                  </p>
                                  <p className="text-base xl:text-base font-semibold leading-6 text-gray-800">
                                    ${Number(items.subtotal).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                  <div className="flex justify-center flex-col md:flex-row   items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-200  space-y-6">
                      <h3 className="text-xl font-semibold leading-5 text-gray-800">
                        Summary
                      </h3>
                      <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                        <div className="flex justify-between w-full">
                          <p className="text-base leading-4 text-gray-800">
                            Subtotal
                          </p>
                          <p className="text-base  leading-4 text-gray-600">
                            $
                            {Number(
                              userorders.reduce((acc, currItem) => {
                                return (
                                  acc +
                                  currItem.products.reduce((total, Current) => {
                                    return total + Current.subtotal;
                                  }, 0)
                                );
                              }, 0)
                            ).toFixed(2)}
                          </p>
                        </div>
                        {/* <div className="flex justify-between items-center w-full">
                          <p className="text-base leading-4 text-gray-800">
                            Discount{" "}
                            <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                              STUDENT
                            </span>
                          </p>
                          <p className="text-base  leading-4 text-gray-600">
                            -$28.00 (50%)
                          </p>
                        </div> */}
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base leading-4 text-gray-800">
                            Shipping
                          </p>
                          <p className="text-base  leading-4 text-gray-600">
                            +$8.00
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base font-semibold leading-4 text-gray-800">
                          Total
                        </p>
                        <p className="text-base  font-semibold leading-4 text-gray-600">
                          ${" "}
                          {Number(
                            userorders.reduce((acc, currItem) => {
                              return (
                                acc +
                                currItem.products.reduce((total, Current) => {
                                  return total + Current.subtotal;
                                }, 0)
                              );
                            }, 0) + 8
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-200    space-y-6">
                      <h3 className="text-xl font-semibold leading-5 text-gray-800">
                        Shipping
                      </h3>
                      <div className="flex justify-between items-start w-full">
                        <div className="flex justify-center items-center space-x-4">
                          <div className="w-8 h-8">
                            <img
                              className="w-full h-full"
                              alt="logo"
                              src="https://i.ibb.co/L8KSdNQ/image-3.png"
                            />
                          </div>
                          <div className="flex flex-col justify-start items-center">
                            <p className="text-lg leading-6 font-semibold text-gray-800">
                              DPD Delivery
                              <br />
                              <span className="font-normal">
                                Delivery with 24 Hours
                              </span>
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-semibold leading-6 text-gray-800">
                          $8.00
                        </p>
                      </div>
                      <div className="w-full flex justify-center items-center">
                        <button
                          className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                          onClick={() => navigate("/trackorders")}
                        >
                          Track Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-200 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                  <h3 className="text-xl font-semibold leading-5 text-gray-800">
                    Customer
                  </h3>
                  <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                    <div className="flex flex-col justify-start items-start flex-shrink-0">
                      <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                        <img src={user} alt="avatar" className="h-12 w-12  " />
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-base font-semibold leading-4 text-left text-gray-800">
                            {userData.firstname} {userData.lastname}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center text-gray-800 md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 7L12 13L21 7"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="cursor-pointer text-sm leading-5 ">
                          {userData.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                      <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                        <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                          <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                            Shipping Address
                          </p>
                          {userorders[0] && userorders[0].address && (
                            <>
                              <p className="w-48 lg:w-full  xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 whitespace-nowrap">
                                <HomeIcon /> {userorders[0].address.street}
                                <p>
                                  {userorders[0].address.city},{" "}
                                  {userorders[0].address.state}
                                </p>
                                <p>
                                  {userorders[0].address.country},{" "}
                                  {userorders[0].address.zipCode}{" "}
                                </p>
                                <p>
                                  <CallIcon />
                                  {userorders[0].address.contact}
                                </p>
                              </p>
                            </>
                          )}
                        </div>
                        <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                          <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                            Billing Address
                          </p>
                          {userorders[0] && userorders[0].address && (
                            <>
                              <p className="w-48 lg:w-full  xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 whitespace-nowrap">
                                <HomeIcon /> {userorders[0].address.street}
                                <p>
                                  {userorders[0].address.city},{" "}
                                  {userorders[0].address.state}
                                </p>
                                <p>
                                  {userorders[0].address.country},{" "}
                                  {userorders[0].address.zipCode}{" "}
                                </p>
                                <p>
                                  <CallIcon />
                                  {userorders[0].address.contact}
                                </p>
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                        <button
                          className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white max-md:mt-8"
                          onClick={() => navigate("/myaddress")}
                        >
                          Change Address
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div>
          {order.pending ? (
            <div role="status mx-auto" className="mt-[10rem]">
              <DataLoaderAnimation />
            </div>
          ) : (
            <>
              <PageNotFound
                items={"You don't have the permission to access this page"}
                message={"Unauthorized Access"}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PaddingGiverHoc(OrderSuccessful);
