import React from "react";

const CardShimmerEffect = () => {
  return (
    <div className="rounded-xl p-1 bg-gray-100  flex items-center justify-center ">
      <div className="h-full rounded-xl w-full mx-auto bg-white shadow-lg p-1 animate__animated animate__fadeIn">
        <div className="shimmer rounded-xl max-sm:h-[11rem] h-[13rem] max-w-[200px] min-w-[220px] max-sm:min-w-[180px]"></div>
      </div>
    </div>
  );
};

export const BigCardShimmerEffect = () => {
  return (
    <>
      <div className="h-full w-full mx-auto bg-white shadow-lg p-1 animate__animated animate__fadeIn max-sm:w-[15rem] max-w-[200px] max-sm:min-w-[12rem] min-w-[20rem]">
        <div className="shimmer rounded cursor-pointer z-2 h-[30rem] max-sm:h-[20rem]  max-sm:w-[15rem] max-w-[200px] max-sm:min-w-[12rem] min-w-[20rem] p-1 flex flex-col"></div>
      </div>
    </>
  );
};
export const ProductPageShimmer = () => {
  return (
    <>
      <div className="h-full w-full mx-auto bg-white shadow-lg p-1 animate__animated animate__fadeIn">
        <div className="shimmer rounded cursor-pointer z-2 h-[25rem] max-sm:h-[20rem]  max-sm:w-[15rem] max-w-[200px]    min-w-[100%] p-1 flex flex-col"></div>
      </div>
    </>
  );
};
export default CardShimmerEffect;
