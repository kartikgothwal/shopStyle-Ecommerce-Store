import React, { useEffect, useRef, useState } from "react";
import { navLinks } from "../../contants";
import { styles } from "../../utils/Style";
import { PaddingGiverHoc } from "../HOC";
import { electronicsOne, electronicsTwo } from "../../assets";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useSelector } from "react-redux";
import { BigCardShimmerEffect } from "../CardShimmerEffect";
import { useNavigate } from "react-router-dom";
const ProductCategoryCard = ({ items }) => {
  return (
    <div className="border-3 cursor-pointer z-2 h-[30rem] max-sm:h-[20rem]  max-sm:w-[15rem] max-w-[200px] max-sm:min-w-[12rem] min-w-[20rem] p-1 flex flex-col">
      <aside className="h-full w-full overflow-hidden">
        <img
          src={items.images[0]}
          alt="product"
          className="h-full transition-all ease-in duration-300 hover:scale-105"
        />
      </aside>
      <div className="flex flex-col gap-1 text-[#000000cb]">
        <h1 className="uppercase mt-4 text-[17px]  max-sm:text-[15px] ">
          {items.title}
        </h1>
        <p className="text-sm  max-sm:text-xs tracking-widest">
          {" "}
          ${items.price}
        </p>
        <p className="text-sm max-sm:text-xs  tracking-widest">
          Sizes:
          {items.sizes.map((vals, index) => {
            if (index == items.sizes.length - 1) {
              return (
                <span key={index} className="ml-1">
                  {vals}
                </span>
              );
            }
            return (
              <span key={index} className="ml-1">
                {vals},
              </span>
            );
          })}
        </p>
        <p className="text-sm flex items-center  max-sm:text-xs  tracking-widest">
          rating:4.5 <StarIcon style={{ fontSize: "16px", color: "orange" }} />
        </p>
      </div>
    </div>
  );
};
const ForWardrobe = () => {
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
    if (ProductData?.length) {
      setProduct(
        ProductData.filter((items) => {
          return (
            items.category === "t shirts" ||
            items.category === "Kurta" ||
            items.category === "Kurta Pajama"
          );
        })
      );
    }
  }, [ProductData]);
  return (
    <>
      <section className=" text-[#545252] h-[100%]  md:mt-12 mt-0 ">
        <h1 className={`${styles.subHeading} text-[#545252]`}>
          {" "}
          Recommendation For Your Wardrobe
        </h1>
        <div className=" scroll-smooth relative overflow-hidden flex gap-12 h-full   py-4  ">
          <button
            ref={prevBtn}
            className="hidden max-sm:left-4 bg-white  max-md:left-4 animate-bounce absolute left-8  top-[44%]  h-12 w-12 rounded-full  z-[10] bg-slate-50 shadow-[0_1px_3px_rgba(23,23,23,0.24)]"
            onClick={() => {
              PreviousBtnClickHandle();
            }}
          >
            <ArrowBackIosNewSharpIcon />
          </button>
          <button
            ref={NextBtn}
            className="max-sm:right-4  max-md:right-4 animate-bounce absolute right-8  top-[44%] border bg-white  h-12 w-12 rounded-full z-[10] bg-slate-50 shadow-[0_1px_3px_rgba(23,23,23,0.24)]"
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
              : testArr.map((items) => <BigCardShimmerEffect />)}
          </div>
        </div>
        <button
          className="relative bg-black px-8 py-3 rounded-md bg-neutral-800 isolation-auto z-10 border-2 border-black before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-white transition-colors delay-100 hover:text-black flex item-center gap-1 max-sm:px-4 mx-auto"
          onClick={() => navigate("/product/Clothes")}
        >
          View All Products <ArrowOutwardIcon />
        </button>
      </section>
    </>
  );
};

export default PaddingGiverHoc(ForWardrobe);
