import React from "react";
import { PaddingGiverHoc } from "../HOC";
import { styles } from "../../utils/Style";
import { mens, women, kids } from "../../assets";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";
const ShopByGender = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="flex h-full w-full flex-col gap-12 justify-between items-center">
        <h1 className={`${styles.subHeading} text-[#545252]`}>Shop By Size </h1>
        <div className="  w-full h-full flex  flex-col  lg:flex-row gap-6 justify-center">
          <div
            className="h-[25rem] w-full"
            onClick={() => navigate("/product/Mens Shirts")}
          >
            <div
              className="hover:opacity-80 cursor-pointer bg-cover h-[90%]"
              style={{ backgroundImage: `url(${mens})` }}
            ></div>
            <h1
              className={`${styles.subHeading} cursor-pointer hover:underline uppercase mt-2 text-[#545252]`}
            >
              Mens{" "}
            </h1>
          </div>
          <div className="h-[25rem] w-full">
            {" "}
            <div
              className="hover:opacity-80 cursor-pointer  bg-cover  h-[90%]"
              style={{ backgroundImage: `url(${women})` }}
            ></div>
            <h1
              className={`${styles.subHeading} cursor-pointer hover:underline uppercase mt-2 text-[#545252]`}
            >
              Womens{" "}
            </h1>{" "}
          </div>
          <div className="h-[25rem] w-full ">
            {" "}
            <div
              className="hover:opacity-80 cursor-pointer  bg-cover mt-2   h-[90%]"
              style={{ backgroundImage: `url(${kids})` }}
            ></div>
            <h1
              className={`${styles.subHeading} cursor-pointer hover:underline uppercase text-[#545252]`}
            >
              Kids{" "}
            </h1>
          </div>
        </div>
        <button
          className="relative bg-black  px-8 py-3 rounded-md isolation-auto z-10 border-2 border-black before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-white transition-colors delay-100 hover:text-black flex item-center gap-1 max-sm:px-4 "
          onClick={() => navigate("/product/Clothes")}
        >
          View All Products <ArrowOutwardIcon />
        </button>
      </section>
    </>
  );
};

export default PaddingGiverHoc(ShopByGender);
