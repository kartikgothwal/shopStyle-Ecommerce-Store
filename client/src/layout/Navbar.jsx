import React, { useEffect, useState } from "react";
import { navLinks } from "../constants";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";
import { toast } from "react-toastify";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
const Navbar = () => {
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const [searchBarData, SetSearchBarData] = useState(null);
  const [inputFocus, SetinputFocus] = useState(false);
  const [searchData, SetSearchData] = useState();
  const [toggleSidebar, setToogleSidebar] = useState(false);
  const toggleSidebarFunction = () => {
    setToogleSidebar(!toggleSidebar);
  };
  async function getData(searchDataval) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/search?data=${searchDataval}`
      );
      if (response.status >= 400) {
        throw "Error found";
      } else {
        const {
          data: { doc },
        } = response;
        if (doc && doc.length) {
          SetSearchData(doc);
          SetSearchBarData(searchDataval);
        } else {
          SetSearchData([]);
          SetSearchBarData(null);
        }
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }
  useEffect(() => {
    console.log("🚀 ~ file: Navbar.jsx:54 ~ Navbar ~ searchData:", searchData);
  }, [searchData]);
  function decounced(fn, d) {
    let time = null;
    return function (...args) {
      if (time) {
        clearTimeout(time);
      }
      time = setTimeout(() => {
        fn.apply(this, args);
      }, d);
    };
  }
  const fetchSearchData = decounced(getData, 300);
  useEffect(() => {
    document.body.style.overflow = toggleSidebar ? "hidden" : "visible";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [toggleSidebar]);

  const removeCookie = () => {
    Cookies.remove("refresh-token");
    navigate("/user-login");
    window.location.reload();
    toast("Your have been logged out");
  };
  const handleSearchChange = (e) => {
    fetchSearchData(e.target.value);
  };

  return (
    <>
      <div
        className={`z-50 ${
          toggleSidebar ? "opacity-90" : "bg-white"
        } top-0 fixed w-full py-3 flex flex-col gap-8`}
      >
        <div className="grid-cols-[5rem_repeat(1,1fr)]  justify-evenly  w-full   grid sm:grid-cols-2 gap-4">
          <div className="w-full flex justify-start">
            <div
              className="sm:hidden flex flex-col gap-1 mx-3 justify-center cursor-pointer"
              onClick={() => toggleSidebarFunction()}
            >
              <div className="border-2 border-black w-8"></div>
              <div className="border-2 border-black w-8"></div>
              <div className="border-2 border-black w-8"></div>
            </div>
          </div>
          <div className="flex items-center justify-evenly">
            <NavLink to={"/"} className="h-[2.5rem] w-[8rem]">
              {" "}
              <img
                src={Logo}
                alt="logo"
                className=" w-[8rem] shadow-[0_0_3px_hsl(240deg,7%,62%)]  sm:ml-[-30px] lg:ml-[-5rem]  h-[2.5rem] cursor-pointer"
              />
            </NavLink>

            <div
              className=" hidden border-2 shadow-[0_0_3px_hsl(240deg,7%,62%)] border-black absolute sm:flex left-8 mx-4 h-[2rem] w-[15rem] rounded-md px-3 md:relative md:left-0 md:flex justify-center items-center max-md:w-[14rem] "
              onMouseEnter={() => SetinputFocus(true)}
              onMouseLeave={() => SetinputFocus(false)}
            >
              <SearchIcon />
              <input
                type="text"
                onChange={(e) => handleSearchChange(e)}
                placeholder="Search for something"
                className="text-[15px] font-rubik w-[100%] outline-none"
              />
              <div
                className={`${
                  inputFocus ? "block" : "hidden"
                } absolute top-[32px]  border border-gray-300  rounded-xl bg-white min-w-full max-w-[30rem] `}
              >
                <div className="w-full min-h-full max-h-[30rem] overflow-y-scroll scrollbar-container">
                  {searchData && searchData.length ? (
                    searchData.map((item) => {
                      return (
                        <div
                          className="flex px-2 w-full flex-col gap-1 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            navigate(`product/${item.title}`);
                          }}
                        >
                          <h3 className="text-[15px]">{item.title}</h3>
                          <p className="text-[10px] text-blue-700 font-bold">
                            {item.category}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="px-2 py-2">No data found</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mx-4 flex flex-wrap justify-center items-center gap-4">
              <Tooltip
                title={userData.email ? "accounts" : "Login"}
                onClick={() => {
                  if (!userData.email) {
                    navigate("/user-login");
                  }
                }}
                className="relative hero-account"
              >
                <PersonIcon
                  className="cursor-pointer  text-[20px]"
                  size="large"
                  data-tooltip="accounts"
                  style={{ fontSize: "30px", color: "#563131" }}
                />
                {userData.email ? (
                  <ul className="absolute invisible max-mobileSize:right-[-110px] max-md:right-[-170px] max-xl:right-[-50px]   pl-6 text-[16px] text-[#563131] flex account-details border transition-display delay-300  my-2 h-[15rem] w-[12rem] bg-white z-50 flex-col items-start py-4 px-2 gap-2">
                    <h1 className="max-sm:text-[12px]">Welcome, {userData.firstname}</h1>

                    <li className="list-none hover:text-[#654444]">
                      <NavLink
                        to="/myaddress"
                        className="text-[14px] max-sm:text-[11px] font-light"
                      >
                        My Address
                      </NavLink>
                    </li>
                    <li className="list-none hover:text-[#654444]">
                      <NavLink
                        to="/trackorders"
                        className="text-[14px] max-sm:text-[11px] font-light"
                      >
                        My Orders
                      </NavLink>
                    </li>
                    <li className="list-none hover:text-[#654444]">
                      <NavLink
                        to="/wishlist"
                        className="text-[14px] max-sm:text-[11px] font-light"
                      >
                        My Wishlist
                      </NavLink>
                    </li>
                    <button
                      className="relative bg-black  px-4 py-1 mt-3 rounded-md bg-neutral-800 isolation-auto z-10 border-2 border-black before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-white transition-colors delay-100 hover:text-black flex item-center gap-1 max-sm:px-4 text-sm"
                      onClick={removeCookie}
                    >
                      Log Out
                    </button>
                  </ul>
                ) : null}
              </Tooltip>
              <Tooltip title="orders" onClick={() => navigate("/trackorders")}>
                <LocalShippingIcon
                  className="cursor-pointer "
                  size="large"
                  data-tooltip="cart"
                  style={{ fontSize: "30px", color: "#563131" }}
                />
              </Tooltip>
              <Tooltip title="wishlist" onClick={() => navigate("/wishlist")}>
                {" "}
                <FavoriteBorderIcon
                  className="cursor-pointer"
                  size="large"
                  data-tooltip="wishlist"
                  style={{ fontSize: "30px", color: "#563131" }}
                />
              </Tooltip>
              <Tooltip title="cart" onClick={() => navigate("/cart")}>
                <ShoppingCartCheckoutIcon
                  className="cursor-pointer "
                  size="large"
                  data-tooltip="cart"
                  style={{ fontSize: "30px", color: "#563131" }}
                />
              </Tooltip>
            </div>
          </div>
        </div>

        <div
          className={`border-b ${
            toggleSidebar ? "border-none" : "border-gray-200"
          }  `}
        >
          <div className=" hidden sm:flex justify-center">
            <ul className="flex gap-4 lg:gap-8 font-rubik uppercase text-[11px] md:text-[13px] lg:text-sm justify-center items-center text-[#271f1f]">
              {navLinks &&
                navLinks.map((nav, index) => {
                  return (
                    <li
                      key={index}
                      className="transition cursor-pointer origin-left hover:border-b hover:border-black pb-4 "
                      onClick={() => navigate(`/product/${nav.link}`)}
                    >
                      <span
                        to={`/product/${nav.link}`}
                        className="whitespace-nowrap"
                      >
                        {" "}
                        {nav.title}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      {toggleSidebar && (
        <>
          <div
            className="z-60 transition-all fixed left-0 duration-500 ease-in-out h-screen"
            onClick={() => toggleSidebarFunction()}
          >
            <div className="block sm:hidden border border-red-900 bg-[#00000042] fixed w-full h-screen"></div>
          </div>
          <div
            className={`sidebar overflow-hidden block mt-[-5px] z-50 sm:hidden border top-0 ${
              toggleSidebar ? "w-[80%]" : "w-0"
            } h-[101%] fixed bg-white`}
          >
            <div className="h-full w-full p-4 px-8 flex flex-col gap-8">
              <CloseIcon
                className="cursor-pointer"
                onClick={() => toggleSidebarFunction()}
              />
              <div
                className="h-full w-full"
                onClick={() => toggleSidebarFunction()}
              >
                <ul className="flex flex-col gap-4">
                  {navLinks &&
                    navLinks.map((nav, index) => {
                      return (
                        <div
                          key={index}
                          className="cursor-pointer border-b border-[#efe9e9] flex justify-between"
                          onClick={() => navigate(`/product/${nav.link}`)}
                        >
                          <li
                            className="hover:text-[#221e1e] text-[13px] font-rubik text-[#5e5959]  pb-4 "
                            onClick={() => navigate(`/product/${nav.link}`)}
                          >
                            <NavLink to={`/product/${nav.link}`}>
                              {" "}
                              {nav.title}
                            </NavLink>
                          </li>
                          <KeyboardArrowRightIcon
                            style={{ color: "#5e5959" }}
                          />
                        </div>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
