import React from "react";

const ComponentLoaderAnimation = () => {
  return (
    <>
      <section className="h-screen w-full border-2 border-red-900 flex justify-center items-center">
        <div className="flex gap-3">
          <div className="h-4 w-4 rounded-full bouncing-loader bg-[#FF7D55]"></div>
          <div className="h-4 w-4 rounded-full bouncing-loader  bg-[#FF7D55]"></div>
          <div className="h-4 w-4 rounded-full bouncing-loader  bg-[#FF7D55]"></div>
        </div>
      </section>
    </>
  );
};

export default ComponentLoaderAnimation;
