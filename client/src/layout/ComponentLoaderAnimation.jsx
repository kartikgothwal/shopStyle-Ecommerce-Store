import React from "react";

const ComponentLoaderAnimation = () => {
  return (
    <>
      <section className="h-screen w-full   border-red-900 flex justify-center items-center">
        <div className="flex gap-3">
          <div className="h-4 w-4 rounded-full bouncing-loader bg-[#FF7D55]"></div>
          <div className="h-4 w-4 rounded-full bouncing-loader  bg-[#FF7D55]"></div>
          <div className="h-4 w-4 rounded-full bouncing-loader  bg-[#FF7D55]"></div>
        </div>
      </section>
    </>
  );
};
export const DataLoaderAnimation = () => {
  return (
    <>
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
      </div>
    </>
  );
};
export default ComponentLoaderAnimation;
