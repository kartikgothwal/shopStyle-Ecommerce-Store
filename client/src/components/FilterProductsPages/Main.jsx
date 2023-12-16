import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PaddingGiverHoc } from "../HOC";
import Footer from "../Footer";
import { LIMIT_PER_PAGE } from "../../contants";
import { ProductPageShimmer } from "../CardShimmerEffect";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProductCard from "../Products/ProductCard";
import Pagination from "./Pagination";
import axios from "axios";
const Main = () => {
  const [CurrentPage, SetCurrentPage] = useState(1);
  const [TotalDetails, SetTotalDetails] = useState({
    totalPages: 0,
    totalDocument: 0,
  });
  const testArr = new Array(10).fill(undefined);
  const [product, SetProduct] = useState(null);
  let totalDocument = 0;
  const [toogleAccordian, SetToogleAccordian] = useState({
    Availability: false,
    Price: false,
    Discount: false,
    Size: false,
    Price: false,
    Rating: false,
  });
  const [Toogle, SetToggle] = useState({
    sort: false,
    filter: false,
  });
  const ProductData = useSelector((state) => state.product.productdata);
  const { category } = useParams();
  const handlePageClick = () => {};
  useEffect(() => {
    PaginationCall();
    SetProduct(
      ProductData.filter((items) => items.subCategory.includes(category))
    );
    async function PaginationCall() {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/product?page=${CurrentPage}&LIMIT_PER_PAGE=${LIMIT_PER_PAGE}&category=${category}`
      );
      console.log(data);
      SetProduct(data.PaginationProducts);
      SetTotalDetails({
        totalPages: data.TotalPages,
        totalDocument: data.TotalDocument,
      });
    }
    window.scrollTo(0, 0);
  }, [ProductData, CurrentPage, category]);

  const handleCurrentPage = (pageVal) => {
    SetCurrentPage(pageVal);
  };
  const handleToogle = (val) => {
    if (val == "sort") {
      SetToggle((prevData) => {
        return { ...prevData, sort: !Toogle.sort };
      });
    } else if (val == "filter") {
      SetToggle((prevData) => {
        return { ...prevData, filter: !Toogle.filter };
      });
    } else return null;
  };
  return (
    <>
      <section className="max-VerySmallmobileSize:top-[8rem] max-mobileSize:top-[8rem]  border-none  relative max-sm:top-[5rem] max-md:top-[7rem] top-[8rem] lg:top-[8rem] max-xl:top-[7rem] xl:top-[6rem] w-full min-h-screen">
        <div className=" min-h-screen w-full mt-3 flex flex-col gap-8  ">
          <div className="py-2 px-8 grid grid-rows-2 lg:gap-y-8">
            <h1 className="text-center text-2xl font-normal text-[#545252]">
              Buy Statement Readymade Blouses Online
            </h1>
            <p className="text-center text-sm font-light">
              Shop online for Suta's stunning designer blouses that feature a
              wide range of necklines, sleeve styles, techniques and colour.
              We're sure you'll find the perfect designer blouse to make your
              looks stand out.
            </p>
          </div>
          <div className=" grid max-md:grid-rows-[70px,1fr]  gap-x-12  md:grid-cols-[minmax(200px,300px)_minmax(334px,1fr)]">
            {/* <div className=" min-h-[36rem] max-h-[100vh] w-full grid md:grid-cols-1 grid-cols-2   "> */}
            <div className=" md:gap-4 h-[4rem] w-full flex flex-row md:flex-col gap-4  ">
              <div className="h-[4rem] w-full relative">
                <button
                  className="border-1 transition-colors duration-300 relative opacity-70 h-16 font-normal text-gray-500 bg-gray-300 text-[12px] right-0 flex justify-center items-center hover:text-gray-900 hover:opacity-80 w-full"
                  onClick={() => handleToogle("sort")}
                >
                  Sort By{" "}
                  <KeyboardArrowDownIcon
                    className={`${
                      Toogle.sort ? "rotate-180" : null
                    } transition-all duration-300`}
                    style={{
                      transition: "transform",
                      transitionDuration: "200ms",
                      transitionTimingFunction: "ease-in",
                    }}
                  />
                </button>
                {Toogle.sort && (
                  <div
                    className="border-2  overflow-y-scroll  absolute w-[100%] bg-white py-6 px-6 z-[41] rounded-xl overflow-hidden"
                    style={{ overflow: "hidden" }}
                  >
                    <ul className=" flex flex-col text-[#545252] gap-4">
                      <button
                        className="text-[13px] capitalize hover:text-[#373232] font-light"
                        onClick={() => handleToogle("sort")}
                      >
                        Alphabetically, A-Z
                      </button>
                      <button
                        className="text-[13px] capitalize hover:text-[#373232] font-light"
                        onClick={() => handleToogle("sort")}
                      >
                        Alphabetically, Z-A
                      </button>
                      <button
                        className="text-[13px] capitalize hover:text-[#373232] font-light"
                        onClick={() => handleToogle("sort")}
                      >
                        Price, low to high
                      </button>
                      <button
                        className="text-[13px] capitalize hover:text-[#373232] font-light"
                        onClick={() => handleToogle("sort")}
                      >
                        Price, low to high
                      </button>
                    </ul>
                  </div>
                )}
              </div>
              <div className="  border text-[#545252] w-full h-full flex flex-col justify-center items-center relative">
                <div
                  className="  flex-col gap-4 h-[76px] w-full flex justify-center items-center text-gray-500 bg-gray-300 text-[12px]  hover:text-gray-900 hover:opacity-80  opacity-70 cursor-pointer"
                  onClick={() => handleToogle("filter")}
                >
                  <h1 className="text-center ny-4 ">
                    Filter by{" "}
                    <KeyboardArrowDownIcon
                      className={`${
                        Toogle.filter ? "rotate-180" : null
                      } transition-all duration-300`}
                      style={{
                        transition: "transform",
                        transitionDuration: "200ms",
                        transitionTimingFunction: "ease-in",
                      }}
                    />
                  </h1>
                </div>

                {Toogle.filter ? (
                  <div className="  w-full   flex flex-col px-4 py-4 gap-5 border-2  bg-white z-40 absolute top-16 rounded-xl overflow-hidden">
                    <div className="flex flex-col text-[12px]  border-b  item-center   w-full cursor-pointer font-normal">
                      <div
                        className="flex justify-between item-center"
                        onClick={() =>
                          SetToogleAccordian((prevData) => {
                            return {
                              ...prevData,
                              Availability: !toogleAccordian.Availability,
                            };
                          })
                        }
                      >
                        <span>Availability </span>
                        <KeyboardArrowDownIcon
                          className={`${
                            toogleAccordian.Availability ? "rotate-180" : null
                          } transition-all duration-300`}
                          style={{
                            transition: "transform",
                            transitionDuration: "300ms",
                            transitionTimingFunction: "ease-in",
                          }}
                        />
                      </div>

                      <div
                        className={`my-3 h-[0px] overflow-hidden ${
                          toogleAccordian.Availability ? " h-[3rem]" : null
                        } transition-all duration-300 flex justify-center gap-3`}
                      >
                        <label
                          className="h-[1.2rem] w-[4rem] relative block aspect-[2/0.75] cursor-pointer rounded-full  bg-gradient-to-r from-gray-200 to-gray-100 bg-[length:100%_100%] shadow-2xl shadow-purple-300 transition-all duration-500 [&amp;:has(input:checked)]:rotate-180  hover:bg-[length:100%_500%] focus:bg-[length:100%_500%] bg-blue-600"
                          style={{ background: "blue" }}
                        >
                          <input
                            type="checkbox"
                            className="peer/input hidden"
                          />
                          <div className="absolute left-[3%] top-1/2 aspect-square h-[90%] -translate-y-1/2 rotate-180 rounded-full bg-white transition-all duration-500 peer-checked/input:left-[63%] peer-checked/input:-rotate-6"></div>
                        </label>{" "}
                        In stock only
                      </div>
                    </div>

                    <div className="flex flex-col text-[12px]  border-b  item-center   w-full cursor-pointer font-normal">
                      <div
                        className="flex justify-between item-center"
                        onClick={() =>
                          SetToogleAccordian((prevData) => {
                            return {
                              ...prevData,
                              Discount: !toogleAccordian.Discount,
                            };
                          })
                        }
                      >
                        <span>Discount </span>
                        <KeyboardArrowDownIcon
                          className={`${
                            toogleAccordian.Discount ? "rotate-180" : null
                          } transition-all duration-300`}
                          style={{
                            transition: "transform",
                            transitionDuration: "300ms",
                            transitionTimingFunction: "ease-in",
                          }}
                        />
                      </div>

                      <div
                        className={`my-3 h-[0px] overflow-hidden ${
                          toogleAccordian.Discount ? " h-[100%]" : null
                        } transition-all duration-300`}
                      >
                        hhekl
                      </div>
                    </div>
                    <div className="flex flex-col text-[12px]  border-b  item-center   w-full cursor-pointer font-normal">
                      <div
                        className="flex justify-between item-center"
                        onClick={() =>
                          SetToogleAccordian((prevData) => {
                            return {
                              ...prevData,
                              Price: !toogleAccordian.Price,
                            };
                          })
                        }
                      >
                        <span>Price </span>
                        <KeyboardArrowDownIcon
                          className={`${
                            toogleAccordian.Price ? "rotate-180" : null
                          } transition-all duration-300`}
                          style={{
                            transition: "transform",
                            transitionDuration: "300ms",
                            transitionTimingFunction: "ease-in",
                          }}
                        />
                      </div>

                      <div
                        className={`my-3 h-[0px] overflow-hidden ${
                          toogleAccordian.Price ? " h-[3rem]" : null
                        } transition-all duration-300`}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Provident veritatis minus libero officiis et?
                      </div>
                    </div>
                    <div className="flex flex-col text-[12px]  border-b  item-center   w-full cursor-pointer font-normal">
                      <div
                        className="flex justify-between item-center"
                        onClick={() => {
                          SetToogleAccordian((prevData) => {
                            return {
                              ...prevData,
                              Size: !toogleAccordian.Size,
                            };
                          });
                        }}
                      >
                        <span>Size </span>
                        <KeyboardArrowDownIcon
                          className={`${
                            toogleAccordian.Size ? "rotate-180" : null
                          } transition-all duration-300`}
                          style={{
                            transition: "transform",
                            transitionDuration: "300ms",
                            transitionTimingFunction: "ease-in",
                          }}
                        />
                      </div>

                      <div
                        className={`my-3 h-[0px] overflow-hidden ${
                          toogleAccordian.Size ? " h-[3rem]" : null
                        } transition-all duration-300`}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Provident veritatis minus libero officiis et?
                      </div>
                    </div>
                    <div className="flex flex-col text-[12px]   item-center   w-full cursor-pointer font-normal">
                      <div
                        className="flex justify-between item-center"
                        onClick={() => {
                          SetToogleAccordian((prevData) => {
                            return {
                              ...prevData,
                              Rating: !toogleAccordian.Rating,
                            };
                          });
                        }}
                      >
                        <span>Rating </span>
                        <KeyboardArrowDownIcon
                          className={`${
                            toogleAccordian.Rating ? "rotate-180" : null
                          } transition-all duration-300`}
                          style={{
                            transition: "transform",
                            transitionDuration: "300ms",
                            transitionTimingFunction: "ease-in",
                          }}
                        />
                      </div>

                      <div
                        className={`my-3 h-[0px] overflow-hidden ${
                          toogleAccordian.Rating ? " h-[3rem]" : null
                        } transition-all duration-300`}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Provident veritatis minus libero officiis et?
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="my-4 max-sm:my-[3rem] sm:my-[3rem] mb-[5rem]  w-full md:my-0">
              <div className=" h-full w-full grid gap-12 grid-cols-[repeat(auto-fit,minmax(150px,400px))] max-md:grid-cols-[repeat(auto-fit,minmax(150px,280px))] justify-center items-center ">
                {product && product.length
                  ? product.map((items) => {
                      return (
                        <ProductCard
                          key={items.id}
                          items={items}
                          totalDocument={totalDocument}
                        />
                      );
                    })
                  : testArr.map((items, index) => (
                      <ProductPageShimmer key={index} />
                    ))}
              </div>
            </div>
          </div>
        </div>

        <Pagination
          {...TotalDetails}
          CurrentPage={CurrentPage}
          handleCurrentPage={handleCurrentPage}
        />
        <Footer />
      </section>
    </>
  );
};

export default PaddingGiverHoc(Main);
