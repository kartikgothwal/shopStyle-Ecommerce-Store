import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PaddingGiverHoc } from "../HOC";
import Footer from "../Footer";
import { LIMIT_PER_PAGE } from "../../contants";
import { ProductPageShimmer } from "../CardShimmerEffect";
import ProductCard from "../Products/ProductCard";
import Pagination from "./Pagination";
import axios from "axios";

import SortingAndFilter from "./SortingAndFilter";
const Main = () => {
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
  useEffect(() => {
    PaginationCall();
    async function PaginationCall() {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/product?page=${CurrentPage}&LIMIT_PER_PAGE=${LIMIT_PER_PAGE}&category=${category}`
      );

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
        <SortingAndFilter product={product}/>
           

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
