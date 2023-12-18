import React, { useEffect, useRef, useState } from "react";
import { navLinks } from  "../../constants";
import { styles } from "../../utils/Style";
import { PaddingGiverHoc } from  "../hoc";
import {CardShimmerEffect} from  "../../layout";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductCategoryCard = ({ items }) => {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer z-2 max-sm:h-[11rem] h-[13rem] max-w-[200px] min-w-[220px] max-sm:min-w-[180px] rounded-xl p-1 border-2 border-[#54525273] "
      onClick={() => navigate(`/product/${items.category}`)}
    >
      <aside className="border h-full rounded-xl w-full overflow-hidden">
        <img
          src={items.image}
          alt="product"
          loading="lazy"
          className="h-full object-center transition-all ease-in duration-300 hover:scale-105 "
        />
      </aside>
      <h1 className="text-center mt-4 capitalize text-[15px] text-[#00000085">
        {items.category}
      </h1>
    </div>
  );
};

const ProductsCategory = () => {
  const ProductData = useSelector((state) => state.product.productdata);
  const testArr = new Array(10).fill(undefined);
  const [category, setCategory] = useState([]);
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
    let val = [];
    // Use nullish coalescing operator to ensure ProductData is an array
    ProductData?.map((items) => {
      return { category: items.category, image: items.thumbnail };
    }).filter((items) => {
      if (!val.length) {
        val.push(items);
      }

      if (val.length && !val.find((data) => data.category == items.category)) {
        val.push(items);
      }
    });

    setCategory(val);
  }, [ProductData]);

  return (
    <section className=" text-[#545252] h-[100%]  md:mt-12 mt-0 ">
      <h1 className={`${styles.subHeading} text-[#545252]`}>
        {" "}
        Product Categories
      </h1>
      <div className=" scroll-smooth relative overflow-hidden flex gap-12 h-full   py-4  ">
        <button
          ref={prevBtn}
          className="hidden max-sm:left-4 bg-white  max-md:left-4 animate-bounce absolute left-8  top-[44%]  h-12 w-12 rounded-full z-[10] bg-slate-50 shadow-[0_1px_3px_rgba(23,23,23,0.24)]"
          onClick={() => {
            PreviousBtnClickHandle();
          }}
        >
          <ArrowBackIosNewSharpIcon />
        </button>
        <button
          ref={NextBtn}
          className="max-sm:right-4 bg-white  max-md:right-4 animate-bounce absolute right-8  top-[44%] border  h-12 w-12 rounded-full z-[10] bg-slate-50 shadow-[0_1px_3px_rgba(23,23,23,0.24)]"
          onClick={() => {
            NextBtnClickHandle();
          }}
        >
          <ArrowForwardIosSharpIcon />
        </button>
        <div
          ref={ImageSlider}
          className=" scroll-smooth relative overflow-hidden flex gap-12 h-full  py-12  "
        >
          {category.length
            ? category.map((items, index) => {
                return (
                  <ProductCategoryCard
                    key={`${items.category}-${index}`}
                    items={items}
                  />
                );
              })
            : testArr.map((items, index) => <CardShimmerEffect key={index} />)}
        </div>
      </div>
    </section>
  );
};

export default PaddingGiverHoc(ProductsCategory);
