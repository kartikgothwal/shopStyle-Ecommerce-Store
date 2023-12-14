import React from "react";

const HomeCarousel = () => {
  return (
    <section className="h-[100%] md:h-[20rem]">
      <h1 className="font-poppins text-center uppercase my-4  text-3xl font-bold text-[#545252]">
        Hello, Welcome to Shop Styles
      </h1>
      <div className="cursor-pointer  bg-no-repeat  bg-center bg-cover relative  background-change-animation h-full hidden md:block ">
        {/* <div className="border absolute bottom-8  right-8  flex flex-row ">
          <ul className="flex gap-3">
            <li className="h-[10px] cursor-pointer rounded-full w-[10px]  border border-[grey]"></li>
            <li className="h-[10px] cursor-pointer rounded-full w-[10px]  border border-[grey]"></li>
            <li className="h-[10px] cursor-pointer rounded-full w-[10px]  border border-[grey]"></li>
            <li className="h-[10px] cursor-pointer rounded-full w-[10px] border border-[grey]"></li>
          </ul>
        </div> */}
      </div>
      <div className=" cursor-pointer  bg-center md:hidden h-[56rem] background-change-animation-small-screen bg-no-repeat "></div>
    </section>
  );
};

export default HomeCarousel;
