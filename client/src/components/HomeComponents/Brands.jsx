import React from "react";
import { styles } from "../../utils/Style";
import { PaddingGiverHoc } from "../HOC";
import { CollabBrands } from "../../constants";
const Brands = () => {
  return (
    <section className="flex flex-col gap-12  h-full w-full  ">
      <h1 className={`${styles.subHeading} pt-0 text-[#545252]`}>
        Brands We Sell
      </h1>
      <div className="border py-4 rounded-[3rem] border-black h-full bg-gradient-to-tr  from-purple-200 to-yellow-200  w-full flex justify-evenly items-center  bg-li">
        {CollabBrands &&
          CollabBrands.map((items, index) => {
            return (
              <div key={items.id} className="">
                <img
                  src={items.img}
                  alt={items.title}
                  className="max-sm:h-[3rem] mix-blend-color-burn max-sm:w-[3rem] max-md:h-[4rem] max-md:w-[4rem] max-lg:h-[6rem] max-lg:w-[6rem] h-[8rem] w-[8rem]"
                />
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default PaddingGiverHoc(Brands);
