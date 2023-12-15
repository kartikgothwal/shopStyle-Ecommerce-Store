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
  const [page, SetPage] = useState(1);
  const testArr = new Array(10).fill(undefined);
  const [product, SetProduct] = useState(null);
  const [toogleAccordian, SetToogleAccordian] = useState({
    Availability: false,
    Price: false,
    Discount: false,
    Size: false,
    Price: false,
    Rating: false,
  });
  const [sortToggle, SetSortToggle] = useState(false);
  const ProductData = useSelector((state) => state.product.productdata);
  const { category } = useParams();
  const handlePageClick = () => {};
  useEffect(() => {
    // PaginationCall();
    console.log(category);
    SetProduct(
      ProductData.filter((items) => items.subCategory.includes(category))
    );
    // async function PaginationCall() {
    //   const { data } = await axios.get(
    //     `${process.env.REACT_APP_BACKEND_URL}/product?page=${page}&LIMIT_PER_PAGE=${LIMIT_PER_PAGE}&category=${category}`
    //   );
    //   console.log(data)
    // SetProduct(data.PaginationProducts);
    // }
    window.scrollTo(0, 0);
  }, []);
  console.log(product);
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
            <div className=" min-h-[36rem] max-h-[100vh] w-full grid md:grid-cols-1 grid-cols-2   ">
              <div className="h-[4rem] w-full relative">
                <button
                  className="border-1 transition-colors duration-300 relative opacity-70 h-16 font-normal text-gray-500 bg-gray-300 text-[12px] right-0 flex justify-center items-center hover:text-gray-900 hover:opacity-80 w-full"
                  onClick={() => SetSortToggle(!sortToggle)}
                >
                  Sort By{" "}
                  <KeyboardArrowDownIcon
                    className={`${
                      sortToggle ? "rotate-180" : null
                    } transition-all duration-300`}
                    style={{
                      transition: "transform",
                      transitionDuration: "200ms",
                      transitionTimingFunction: "ease-in",
                    }}
                  />
                </button>
                {sortToggle && (
                  <div className="border border-gray-500 overflow-y-scroll h-[15rem] absolute w-[100%] bg-white py-6 px-6 z-40">
                    <ul className=" flex flex-col text-[#545252] gap-4">
                      <button
                        className="text-[13px] capitalize hover:text-[#373232] font-light"
                        onClick={() => SetSortToggle(!sortToggle)}
                      >
                        Featured
                      </button>
                      <button
                        className="text-[13px] capitalize hover:text-[#373232] font-light"
                        onClick={() => SetSortToggle(!sortToggle)}
                      >
                        Best Selling
                      </button>
                      <button
                        className="text-[13px] capitalize hover:text-[#373232] font-light"
                        onClick={() => SetSortToggle(!sortToggle)}
                      >
                        Alphabetically, A-Z
                      </button>
                      <button
                        className="text-[13px] capitalize hover:text-[#373232] font-light"
                        onClick={() => SetSortToggle(!sortToggle)}
                      >
                        Alphabetically, Z-A
                      </button>
                      <button
                        className="text-[13px] capitalize hover:text-[#373232] font-light"
                        onClick={() => SetSortToggle(!sortToggle)}
                      >
                        Price, low to high
                      </button>
                      <button
                        className="text-[13px] capitalize hover:text-[#373232] font-light"
                        onClick={() => SetSortToggle(!sortToggle)}
                      >
                        Price, low to high
                      </button>
                    </ul>
                  </div>
                )}
              </div>
              <div className="sticky top-2 border text-[#545252] w-full h-full flex gap-7 flex-col justify-center items-center">
                <div className="flex flex-col gap-4">
                  <p className="text-center ">
                    {product ? (
                      <span className="font-bold">{product.length} </span>
                    ) : (
                      "_"
                    )}
                    products
                  </p>
                  <h1 className="text-center text-sm">Filter by</h1>
                </div>
                <div className="sticky w-full h-full flex flex-col px-4 py-2 gap-5">
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
                        <input type="checkbox" className="peer/input hidden" />
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
                        toogleAccordian.Discount ? " h-[3rem]" : null
                      } transition-all duration-300`}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Provident veritatis minus libero officiis et?
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
                  <div className="flex flex-col text-[12px]  border-b  item-center   w-full cursor-pointer font-normal">
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
              </div>
            </div>

            <div className="my-4 max-sm:my-[3rem] sm:my-[3rem] mb-[5rem]  w-full md:my-0">
              <div className=" h-full w-full grid gap-12 grid-cols-[repeat(auto-fit,minmax(150px,400px))] max-md:grid-cols-[repeat(auto-fit,minmax(150px,280px))] justify-center items-center ">
                {product && product.length
                  ? product.map((items) => {
                      return <ProductCard key={items.id} items={items} />;
                    })
                  : testArr.map((items, index) => (
                      <ProductPageShimmer key={index} />
                    ))}
              </div>
            </div>
          </div>
        </div>

        <Pagination />
        <Footer />
      </section>
    </>
  );
};

export default PaddingGiverHoc(Main);
