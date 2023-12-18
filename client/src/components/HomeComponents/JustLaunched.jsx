import React, { useRef, useEffect, useState } from "react";
import { styles } from "../../utils/Style";
import { PaddingGiverHoc } from "../HOC";
import { electronicsOne, electronicsTwo } from "../../assets";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useSelector } from "react-redux";
import { BigCardShimmerEffect } from "../../layout/CardShimmerEffect";
import { useNavigate } from "react-router-dom";

const ProductCategoryCard = ({ items }) => {
  const navigate = useNavigate();
  return (
    <div className="border-3 cursor-pointer z-2 h-[30rem] max-sm:h-[20rem]  max-sm:w-[15rem] max-w-[200px] max-sm:min-w-[12rem] min-w-[20rem] p-1 flex flex-col">
      <aside
        className="h-full w-full overflow-hidden"
        onClick={() => navigate(`productoverview/${items._id}`)}
      >
        <img
          loading="lazy"
          src={items.images[1]}
          alt="product"
          className="h-full shimmer transition-all ease-in duration-300 hover:scale-105 bg-gradient-to-r from-slate-100 object-cover to-slate-200  overflow-hidden"
        />
      </aside>
      <div className="flex flex-col gap-1 text-[#000000cb]">
        <h1 className="uppercase mt-4 text-[17px]  max-sm:text-[15px] overflow-hidden whitespace-nowrap text-ellipsis">
          {items.title}
        </h1>
        <p className="text-sm  max-sm:text-xs tracking-widest">
          ${items.price}
        </p>
        <p className="text-sm max-sm:text-xs  tracking-widest">
          Sizes:XS,S,XL,M
        </p>
        <p className="text-sm flex items-center  max-sm:text-xs  tracking-widest">
          rating:4.5 <StarIcon style={{ fontSize: "16px", color: "orange" }} />
        </p>
      </div>
    </div>
  );
};
const JustLaunched = () => {
  const navigate = useNavigate();
  const testArr = new Array(10).fill(undefined);
  const [product, setProduct] = useState([]);
  const ProductData = useSelector((state) => state.product.productdata);
  const ImageSlider = useRef();
  const prevBtn = useRef();
  const NextBtn = useRef();
  const PreviousBtnClickHandle = () => {
    let width = ImageSlider.current.clientWidth;
    ImageSlider.current.scrollLeft -= width;
    if (Math.round(ImageSlider.current.scrollLeft) === 0) {
      prevBtn.current.style.display = "none";
    } else {
      NextBtn.current.style.display = "block";
      prevBtn.current.style.display = "block";
    }
  };
  const NextBtnClickHandle = () => {
    let width = ImageSlider.current.clientWidth;
    ImageSlider.current.scrollLeft += width;
    if (Math.round(ImageSlider.current.scrollLeft) === 542) {
      NextBtn.current.style.display = "none";
    } else {
      NextBtn.current.style.display = "block";
      prevBtn.current.style.display = "block";
    }
  };
  useEffect(() => {
    if (ProductData && ProductData.length) {
      setProduct(
        ProductData.slice(ProductData.length - 10),
        ProductData.length
      );
    }
  }, [ProductData]);
  return (
    <>
      <section className=" text-[#545252] h-[100%]  md:mt-12 mt-0 ">
        <h1 className={`${styles.subHeading} text-[#545252]`}>
          {" "}
          Just Launched
        </h1>
        <div className=" scroll-smooth relative overflow-hidden flex gap-12 h-full   py-4  ">
          <button
            ref={prevBtn}
            className="hidden max-sm:left-4 max-md:left-4 animate-bounce absolute left-8  top-[44%]  h-12 w-12 rounded-full bg-white  z-[10] bg-slate-50 shadow-[0_1px_3px_rgba(23,23,23,0.24)]"
            onClick={() => {
              PreviousBtnClickHandle();
            }}
          >
            <ArrowBackIosNewSharpIcon />
          </button>
          <button
            ref={NextBtn}
            className="max-sm:right-4 max-md:right-4 animate-bounce absolute right-8  top-[44%] border  bg-white h-12 w-12 rounded-full z-[10] bg-slate-50 shadow-[0_1px_3px_rgba(23,23,23,0.24)]"
            onClick={() => {
              NextBtnClickHandle();
            }}
          >
            <ArrowForwardIosSharpIcon />
          </button>
          <div
            ref={ImageSlider}
            className=" scroll-smooth relative overflow-hidden flex gap-12 max-sm:gap-4 h-full py-12"
          >
            {product.length
              ? product.map((items, index) => {
                  return (
                    <>
                      <ProductCategoryCard key={items.id} items={items} />
                    </>
                  );
                })
              : testArr.map((items, index) => {
                  return <BigCardShimmerEffect key={index} />;
                })}
          </div>
        </div>
        {/* <button className="relative bg-black  px-8 py-3 rounded-md bg-neutral-800 isolation-auto z-10 border-2 border-black before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-white transition-colors delay-100 hover:text-black flex item-center gap-1 max-sm:px-4 mx-auto">
          View All Products <ArrowOutwardIcon />
        </button> */}
      </section>
      <section className="mt-28 h-full w-full flex  flex-col gap-12 justify-between items-center">
        <h1 className={`${styles.subHeading} text-[#545252]`}>Electronics </h1>
        <div className="grid h-[30rem] grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div
            className="cursor-pointer bg-cover relative bg-center  h-full w-full transition-all max-sm:h-[15rem] ease-in duration-300 hover:opacity-80 "
            style={{ backgroundImage: `url(${electronicsOne})` }}
          >
            <div className="text-white absolute top-20 left-20 max-md:left-12">
              <p>Holiday Deals</p>
              <h1 className="max-md:text-[1rem] text-[2rem]  font-bold">
                Up to 30% off
              </h1>
              <p>Selected Smartphone Brands</p>
              <button
                className="border transition-color duration-300 hover:bg-transparent hover:border-white hover:text-white  px-10 py-1 my-4 rounded-[22px] bg-white text-black"
                onClick={() => navigate("/product/Smartphone")}
              >
                Shop
              </button>
            </div>
          </div>
          <div
            className="cursor-pointer bg-cover relative bg-center  h-full w-full transition-all max-sm:h-[15rem] ease-in duration-300 hover:opacity-80 "
            style={{ backgroundImage: `url(${electronicsTwo})` }}
          >
            <div className="text-white absolute top-20 left-20 max-md:left-12">
              <p>Holiday Deals</p>
              <h1 className="max-md:text-[1rem] text-[2rem] font-bold">
                Up to 20% off
              </h1>
              <p>Selected Headphones Brands</p>
              <button
                className="border transition-color duration-300 hover:bg-transparent hover:border-white hover:text-white px-10 py-1 my-4 rounded-[22px] bg-white text-black"
                onClick={() => navigate("/product/Headphone")}
              >
                Shop
              </button>
            </div>
          </div>
        </div>
        <button
          className="relative bg-black  px-8 py-3 rounded-md bg-neutral-800 isolation-auto z-10 border-2 border-black before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-white transition-colors delay-100 hover:text-black flex item-center gap-1 max-sm:px-4"
          onClick={() => navigate("/product/Electronic")}
        >
          View All Products
          <ArrowOutwardIcon className="font-bold" />
        </button>
      </section>
    </>
  );
};

export default PaddingGiverHoc(JustLaunched);
