import React from "react";
import { styles } from "../../utils/Style";
import { PaddingGiverHoc } from "../HOC";
const NewLetter = () => {
  return (
    <section className="  py-8 px-[7rem] max-lg:px-[5rem] flex justify-center items-center h-[100%] bg-[#116dff] text-white">
      <div className="  gap-3 h-full w-full   flex flex-col ustify-center items-center ">
        <h1 className="text-4xl max-md:text-2xl">Newsletter</h1>
        <p className="text-xl max-lg:text-sm flex justify-center item-center text-center">
          Sign up to receive updates on new arrivals and special offers
        </p>
        <div className=" my-2 relative      w-full h-full flex items-center justify-center  max-md:flex-col ">
          <div className="  relative gap-2  flex w-[50%] justify-center flex-col items-center max-md:items-center">
            <label
               htmlFor="email"
              className="max-md:text-xs after:contents:(*)"
            >
              Email
              <span className="  after:content-['*'] text-red-800 after:text-xs after:mr-2"></span>
            </label>
            <input
              type="text"
              className="outline-none max-md:h-8 text-center text-black font-light h-12 rounded-[22px] z-10 max-md:w-[14rem] max-md:text-xs px-5 w-[25rem] md:text-center"
              id="email"
              placeholder="Enter your Email"
            />
          <button className="max-md:w-[15rem]  h-10 hover:border   transition-color duration-300 hover:bg-transparent hover:border-white hover:text-white  px-10 py-[-2] my-4 rounded-[22px] bg-black  z-20 text-white md:ml[-20px] ">
            Subscribe
          </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaddingGiverHoc(NewLetter);
