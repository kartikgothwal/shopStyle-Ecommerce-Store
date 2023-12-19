import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PaddingGiverHoc } from  "../hoc";
import { LIMIT_PER_PAGE } from "../../constants";
import { ProductPageShimmer } from  "../../layout";
import ProductCard from "../../features/products/Products";
import Pagination from "./Pagination";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Main = ({ setProgress, progress }) => {
  const [AllBrands, SetAllBrands] = useState([]);
  const [CurrentPage, SetCurrentPage] = useState(1);
  const [TotalDetails, SetTotalDetails] = useState({
    totalPages: 0,
    totalDocument: 0,
  });

  const testArr = new Array(10).fill(undefined);
  const [product, SetProduct] = useState(null);
  let totalDocument = 0;
  const ProductData = useSelector((state) => state.product.productdata);
  const { category } = useParams();

  const handleCurrentPage = (pageVal) => {
    SetCurrentPage(pageVal);
  };

  const [priceValues, SetPriceValues] = useState({
    minPrice: 0,
    maxPrice: 0,
  });
  const [Toogle, SetToggle] = useState({
    sort: false,
    filter: false,
  });
  const [modifyData, SetModifyData] = useState({
    sort: null,
    filter: null,
  });
  const [toogleAccordian, SetToogleAccordian] = useState({
    Availability: false,
    Price: false,
    Discount: false,
    Brands: false,
    Size: false,
    Price: false,
    Rating: false,
  });

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
  const handlePriceValuesChange = (e) => {
    let { name, value } = e.target;
    value = Number(value);
    if (isNaN(value)) {
      return alert("Enter a valid price");
    }
    SetPriceValues((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const handlePriceGoClick = (e) => {
    e.preventDefault();
    if (priceValues.minPrice >= priceValues.maxPrice) {
      return alert("Max price cannot be less then or equal to min price");
    } else {
      SetModifyData((prevData) => {
        return {
          ...prevData,
          filter: {
            ...modifyData.filter,
            price: { $gte: priceValues.minPrice, $lte: priceValues.maxPrice },
          },
        };
      });
    }
  };

  const handleSizeChange = (sizeValue) => {
    if (
      modifyData.filter &&
      modifyData.filter.sizes &&
      modifyData.filter.sizes.length
    ) {
      const shorter = modifyData.filter.sizes;
      if (shorter.indexOf(sizeValue) == -1) {
        SetModifyData((prevData) => {
          return {
            ...prevData,
            filter: {
              ...modifyData.filter,
              sizes: [...shorter, sizeValue],
            },
          };
        });
      } else {
        shorter.splice(shorter.indexOf(sizeValue), 1);
        if (shorter.length) {
          SetModifyData((prevData) => {
            return {
              ...prevData,
              filter: {
                ...modifyData.filter,
                sizes: shorter,
              },
            };
          });
        } else {
          const { sizes, ...restFilter } = modifyData.filter;
          SetModifyData((prevData) => {
            return {
              ...prevData,
              filter: {
                ...restFilter,
              },
            };
          });
        }
      }
    } else {
      SetModifyData((prevData) => {
        return {
          ...prevData,
          filter: {
            ...modifyData.filter,
            sizes: [sizeValue],
          },
        };
      });
    }
  };

  useEffect(() => {
    setProgress(progress + 10);
    PaginationCall();
    async function PaginationCall() {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/product?page=${CurrentPage}&LIMIT_PER_PAGE=${LIMIT_PER_PAGE}&category=${category}`,
          modifyData
        );
        setProgress(progress + 20);
        if (response.status >= 200 && response.status < 300) {
          const { data } = response;
          SetProduct(data.PaginationProducts);
          SetTotalDetails({
            totalPages: data.TotalPages,
            totalDocument: data.TotalDocument,
          });
          SetAllBrands(data.brands);
        } else {
          console.error("Request was not successful:", response);
        }
        setProgress(progress + 100);
      } catch (error) {
        console.error("Error during request:", error);
        alert("Error found");
        setProgress(progress + 100);
      } finally {
        window.scrollTo(0, 0);
        setProgress(progress + 100);
      }
    }
  }, [ProductData, CurrentPage, category, modifyData]);
  
  return (
    <>
      <section className="max-VerySmallmobileSize:top-[8rem] max-mobileSize:top-[8rem]  border-none  relative max-sm:top-[5rem] max-md:top-[7rem] top-[8rem] lg:top-[8rem] max-xl:top-[7rem] xl:top-[6rem] w-full min-h-screen">
        <div className=" min-h-screen w-full mt-3 flex flex-col gap-8  ">
          <div className="py-2 px-8 grid grid-rows-2 lg:gap-y-8">
            <h1 className="text-center text-2xl font-normal capitalize text-[#545252]">
              Showing results for {category}
            </h1>
            <p className="text-center text-sm font-light">
              Shop online for Suta's stunning designer blouses that feature a
              wide range of necklines, sleeve styles, techniques and colour.
              We're sure you'll find the perfect designer blouse to make your
              looks stand out.
            </p>
          </div>
          <div className=" grid max-md:grid-rows-[70px,1fr]  gap-x-12  md:grid-cols-[minmax(200px,300px)_minmax(334px,1fr)]">
            <div className=" md:gap-4 h-[4rem] w-full flex flex-row md:flex-col gap-4  ">
              <div className="h-[4rem] w-full relative">
                <button
                  className="border-1 transition-colors duration-300 relative opacity-70 h-16 font-normal text-gray-500 bg-gray-300 text-[12px] right-0 flex justify-center items-center hover:text-gray-900 hover:opacity-80 w-full"
                  onClick={() => {
                    handleToogle("sort");
                  }}
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
                        className="text-[13px] capitalize  font-light hover:text-red-600"
                        onClick={() => {
                          handleToogle("sort");
                          SetModifyData((prevData) => {
                            return {
                              ...prevData,
                              sort: {
                                createdAt: 1,
                              },
                            };
                          });
                        }}
                      >
                        Newest First
                      </button>
                      <button
                        className="text-[13px] capitalize  font-light hover:text-red-600"
                        onClick={() => {
                          handleToogle("sort");
                          SetModifyData((prevData) => {
                            return {
                              ...prevData,
                              sort: {
                                createdAt: -1,
                              },
                            };
                          });
                        }}
                      >
                        Oldest First
                      </button>
                      <button
                        className="text-[13px] capitalize  font-light hover:text-red-600"
                        onClick={() => {
                          handleToogle("sort");
                          SetModifyData((prevData) => {
                            return {
                              ...prevData,
                              sort: { title: 1 },
                            };
                          });
                        }}
                      >
                        Alphabetically, A-Z
                      </button>
                      <button
                        className="text-[13px] capitalize  font-light hover:text-red-600"
                        onClick={() => {
                          handleToogle("sort");
                          SetModifyData((prevData) => {
                            return {
                              ...prevData,
                              sort: { title: -1 },
                            };
                          });
                        }}
                      >
                        Alphabetically, Z-A
                      </button>
                      <button
                        className="text-[13px] capitalize  font-light hover:text-red-600"
                        onClick={() => {
                          SetModifyData((prevData) => {
                            return {
                              ...prevData,
                              sort: { price: 1 },
                            };
                          });
                        }}
                      >
                        Price, low to high
                      </button>
                      <button
                        className="text-[13px] capitalize  font-light hover:text-red-600"
                        onClick={() => {
                          handleToogle("sort");
                          SetModifyData((prevData) => {
                            return {
                              ...prevData,
                              sort: { price: -1 },
                            };
                          });
                        }}
                      >
                        Price, high to low
                      </button>
                    </ul>
                  </div>
                )}
              </div>
              <div className=" border text-[#545252] w-full h-full flex flex-col justify-center items-center relative">
                <div
                  className=" flex-col gap-4 h-[76px] w-full flex justify-center items-center text-gray-500 bg-gray-300 text-[12px]  hover:text-gray-900 hover:opacity-80  opacity-70 cursor-pointer"
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
                          toogleAccordian.Availability ? " h-[100%]" : null
                        } transition-all duration-300 flex justify-center gap-3`}
                      >
                        <label
                          className="h-[1.2rem] w-[4rem] relative block aspect-[2/0.75] cursor-pointer rounded-full  bg-gradient-to-r from-gray-200 to-gray-100 bg-[length:100%_100%] shadow-2xl shadow-purple-300 transition-all duration-500 [&amp;:has(input:checked)]:rotate-180  hover:bg-[length:100%_500%] focus:bg-[length:100%_500%] bg-blue-600"
                          style={{ background: "blue" }}
                        >
                          <input
                            type="checkbox"
                            className="peer/input hidden"
                            onChange={() => {
                              SetModifyData((prevData) => {
                                if (
                                  modifyData.filter &&
                                  modifyData.filter.availability
                                ) {
                                  const { availability, ...restFilter } =
                                    modifyData.filter; // Remove 'availability' field
                                  return {
                                    ...prevData,
                                    filter: {
                                      ...restFilter,
                                    },
                                  };
                                } else {
                                  return {
                                    ...prevData,
                                    filter: {
                                      ...modifyData.filter,
                                      availability: true,
                                    },
                                  };
                                }
                              });
                            }}
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
                        <p className="flex justify-start items-center gap-1">
                          <input
                            type="radio"
                            name="discount"
                            onChange={() => {
                              SetModifyData((prevData) => {
                                const { discountPercentage, ...restValues } =
                                  modifyData.filter;
                                return {
                                  ...prevData,
                                  filter: {
                                    ...restValues,
                                  },
                                };
                              });
                            }}
                          />{" "}
                          <span>Any discount</span>
                        </p>
                        <p className="flex justify-start items-center gap-1">
                          <input
                            type="radio"
                            name="discount"
                            onChange={() => {
                              SetModifyData((prevData) => {
                                return {
                                  ...prevData,
                                  filter: {
                                    ...modifyData.filter,
                                    discountPercentage: { $gte: 4 },
                                  },
                                };
                              });
                            }}
                          />{" "}
                          <span>4% or more</span>
                        </p>
                        <p className="  flex justify-start items-center gap-1">
                          <input
                            type="radio"
                            name="discount"
                            onChange={() => {
                              SetModifyData((prevData) => {
                                return {
                                  ...prevData,
                                  filter: {
                                    ...modifyData.filter,
                                    discountPercentage: { $gte: 8 },
                                  },
                                };
                              });
                            }}
                          />{" "}
                          <span>8% or more</span>
                        </p>
                        <p className="flex justify-start items-center gap-1">
                          <input
                            type="radio"
                            name="discount"
                            onChange={() => {
                              SetModifyData((prevData) => {
                                return {
                                  ...prevData,
                                  filter: {
                                    ...modifyData.filter,
                                    discountPercentage: { $gte: 12 },
                                  },
                                };
                              });
                            }}
                          />{" "}
                          <span> 12% or more</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col text-[12px]  border-b  item-center   w-full cursor-pointer font-normal">
                      <div
                        className="flex justify-between item-center"
                        onClick={() =>
                          SetToogleAccordian((prevData) => {
                            return {
                              ...prevData,
                              Brands: !toogleAccordian.Brands,
                            };
                          })
                        }
                      >
                        <span>Brands</span>
                        <KeyboardArrowDownIcon
                          className={`${
                            toogleAccordian.Brands ? "rotate-180" : null
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
                          toogleAccordian.Brands ? " h-[100%]" : null
                        } transition-all duration-300`}
                      >
                        {AllBrands && AllBrands.length ? (
                          AllBrands.map((brand) => (
                            <div
                              key={brand}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                id="myCheckbox"
                                className="form-checkbox text-blue-500 h-4 w-4"
                                onChange={() => {
                                  if (
                                    modifyData.filter &&
                                    modifyData.filter.brand &&
                                    modifyData.filter.brand.length
                                  ) {
                                    let shorter = modifyData.filter.brand;
                                    if (shorter.indexOf(brand) == -1) {
                                      SetModifyData((prevData) => {
                                        return {
                                          ...prevData,
                                          filter: {
                                            ...modifyData.filter,
                                            brand: [...shorter, brand],
                                          },
                                        };
                                      });
                                    } else {
                                      shorter.splice(shorter.indexOf(brand), 1);
                                      if (shorter.length) {
                                        SetModifyData((prevData) => {
                                          return {
                                            ...prevData,
                                            filter: {
                                              ...modifyData.filter,
                                              brand: shorter,
                                            },
                                          };
                                        });
                                      } else {
                                        const { brand, ...restFilter } =
                                          modifyData.filter;
                                        SetModifyData((prevData) => {
                                          return {
                                            ...prevData,
                                            filter: {
                                              ...restFilter,
                                            },
                                          };
                                        });
                                      }
                                    }
                                  } else {
                                    SetModifyData((prevData) => {
                                      return {
                                        ...prevData,
                                        filter: {
                                          ...modifyData.filter,
                                          brand: [brand],
                                        },
                                      };
                                    });
                                  }
                                }}
                              />
                              <label htmlFor="myCheckbox" className="text-gray-700">
                                {brand}
                              </label>
                            </div>
                          ))
                        ) : (
                          <p>No Brands Found</p>
                        )}
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
                          toogleAccordian.Price ? " h-[100%]" : null
                        } transition-all duration-300`}
                      >
                        <p className="  flex justify-start items-center gap-2">
                          <input
                            type="radio"
                            name="price"
                            onChange={() => {
                              SetModifyData((prevData) => {
                                const { price, ...restFilter } =
                                  modifyData.filter;
                                return {
                                  ...prevData,
                                  filter: {
                                    ...restFilter,
                                  },
                                };
                              });
                            }}
                          />{" "}
                          <span>Any price</span>
                        </p>
                        <p className="flex justify-start items-center gap-2">
                          <input
                            type="radio"
                            name="price"
                            onChange={() => {
                              SetModifyData((prevData) => {
                                return {
                                  ...prevData,
                                  filter: {
                                    ...modifyData.filter,
                                    price: { $lt: 100 },
                                  },
                                };
                              });
                            }}
                          />{" "}
                          <span>Under $100</span>
                        </p>
                        <p className="flex justify-start items-center gap-2">
                          <input
                            type="radio"
                            name="price"
                            onChange={() => {
                              SetModifyData((prevData) => {
                                return {
                                  ...prevData,
                                  filter: {
                                    ...modifyData.filter,
                                    price: { $lt: 200 },
                                  },
                                };
                              });
                            }}
                          />{" "}
                          <span>Under $200</span>
                        </p>
                        <p className="flex justify-start items-center gap-2">
                          <input
                            type="radio"
                            name="price"
                            onChange={() => {
                              SetModifyData((prevData) => {
                                return {
                                  ...prevData,
                                  filter: {
                                    ...modifyData.filter,
                                    price: { $lt: 300 },
                                  },
                                };
                              });
                            }}
                          />{" "}
                          <span>Under $300</span>
                        </p>
                        <p className="flex justify-start items-center gap-2">
                          <input
                            type="radio"
                            name="price"
                            onChange={() => {
                              SetModifyData((prevData) => {
                                return {
                                  ...prevData,
                                  filter: {
                                    ...modifyData.filter,
                                    price: { $lt: 100 },
                                  },
                                };
                              });
                            }}
                          />{" "}
                          <span>Under $400</span>
                        </p>
                        <div className="flex gap-4 mt-4 flex-col sm:flex-row">
                          <input
                            type="text"
                            pattern="[0-9]*"
                            className="border-2 w-[70px] rounded px-2 outline-none"
                            min={0}
                            max={1000}
                            name="minPrice"
                            value={priceValues.minPrice}
                            onChange={(e) => handlePriceValuesChange(e)}
                            placeholder="$min"
                          />
                          <input
                            type="text"
                            pattern="[0-9]*"
                            className="border-2 w-[70px] rounded px-2 outline-none"
                            min={0}
                            max={1000}
                            name="maxPrice"
                            value={priceValues.maxPrice}
                            onChange={(e) => handlePriceValuesChange(e)}
                            placeholder="$max"
                          />
                          <button
                            className="border-2 flex justify-center items-center bg-black text-white w-8 rounded px-2 pt-1"
                            onClick={handlePriceGoClick}
                          >
                            Go
                          </button>
                        </div>
                      </div>
                    </div>

                    {product &&
                    product.length &&
                    product.some(
                      (item) => item.sizes && item.sizes.length > 0
                    ) ? (
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
                          <span>Size</span>
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
                            toogleAccordian.Size ? " h-[100%]" : null
                          } transition-all duration-300`}
                        >
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="myCheckbox"
                              className="form-checkbox text-blue-500 h-4 w-4"
                              onChange={() => {
                                handleSizeChange("XS");
                              }}
                            />
                            <label htmlFor="myCheckbox" className="text-gray-700">
                              XS
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="myCheckbox"
                              className="form-checkbox text-blue-500 h-4 w-4"
                              onChange={() => {
                                handleSizeChange("S");
                              }}
                            />
                            <label htmlFor="myCheckbox" className="text-gray-700">
                              S
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="myCheckbox"
                              className="form-checkbox text-blue-500 h-4 w-4"
                              onChange={() => {
                                handleSizeChange("M");
                              }}
                            />
                            <label htmlFor="myCheckbox" className="text-gray-700">
                              M
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="myCheckbox"
                              className="form-checkbox text-blue-500 h-4 w-4"
                              onChange={() => {
                                handleSizeChange("L");
                              }}
                            />
                            <label htmlFor="myCheckbox" className="text-gray-700">
                              L
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="myCheckbox"
                              className="form-checkbox text-blue-500 h-4 w-4"
                              onChange={() => {
                                handleSizeChange("XL");
                              }}
                            />
                            <label htmlFor="myCheckbox" className="text-gray-700">
                              XL
                            </label>
                          </div>
                        </div>
                      </div>
                    ) : null}

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
                          toogleAccordian.Rating ? " h-[100%]" : null
                        } transition-all duration-300`}
                      >
                        <p className="flex justify-start items-center gap-1">
                          <input type="radio" name="rating" />{" "}
                          {new Array(4).fill(undefined).map((items) => (
                            <StarIcon className="text-orange-400" />
                          ))}
                        </p>
                        <p className="  flex justify-start items-center gap-1">
                          <input type="radio" name="rating" />{" "}
                          {new Array(3).fill(undefined).map((items) => (
                            <StarIcon className="text-orange-400" />
                          ))}
                        </p>
                        <p className="  flex justify-start items-center gap-1">
                          <input type="radio" name="rating" />{" "}
                          {new Array(2).fill(undefined).map((items) => (
                            <StarIcon className="text-orange-400" />
                          ))}
                        </p>
                        <p className="  flex justify-start items-center gap-1">
                          <input type="radio" name="rating" />{" "}
                          {new Array(1).fill(undefined).map((items) => (
                            <StarIcon className="text-orange-400" />
                          ))}
                        </p>
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
                        setProgress={setProgress}
                        progress={progress}
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
      
      </section>
    </>
  );
};

export default PaddingGiverHoc(Main);
