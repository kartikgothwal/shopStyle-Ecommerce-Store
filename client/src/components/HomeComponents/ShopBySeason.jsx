import { PaddingGiverHoc } from "../HOC";
import { styles } from "../../utils/Style";
import { winterOne, winterThree, winterTwo } from "../../assets";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
const ShopBySeason = () => {
  return (
    <section className="h-full w-full flex  flex-col gap-12 justify-between items-center">
      <h1 className={`${styles.subHeading} text-[#545252]`}>
        Shop for Season{" "}
      </h1>
      <div className="grid h-[30rem] grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div
          className="cursor-pointer bg-cover relative bg-center  h-full w-full transition-all max-sm:h-[15rem] ease-in duration-300 hover:opacity-80 "
          style={{ backgroundImage: `url(${winterOne})` }}
        >
          <h1 className="text-white hover:underline font-bold  text-[2rem] absolute bottom-4 left-4 max-md:text-[1rem]">
            Winter Collections <ArrowOutwardIcon className="font-bold" />
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-rows-2 sm:grid-cols-1 max-sm:h-[15rem] w-full  gap-4 ">
          <div
            className="cursor-pointer relative bg-center bg-contain transition-all ease-in duration-300 hover:opacity-80"
            style={{
              backgroundImage: `url(${winterTwo})`,
            }}
          >
            {" "}
            <h1 className="text-white  hover:underline  font-bold  text-[2rem] max-md:text-[1rem] absolute bottom-4 left-4">
              Gloves <ArrowOutwardIcon className="font-bold" />
            </h1>
          </div>
          <div
            className="relative cursor-pointer bg-center bg-cover bg-no-repeat hover:opacity-80 hover:bg-"
            style={{ backgroundImage: `url(${winterThree})` }}
          >
            <h1 className="text-white  hover:underline  font-bold  text-[2rem] absolute bottom-4 left-4 max-md:text-[1rem]">
              Jackets <ArrowOutwardIcon className="font-bold" />
            </h1>
          </div>
        </div>
      </div>
      <button className="relative bg-black  px-8 py-3 rounded-md bg-neutral-800 isolation-auto z-10 border-2 border-black before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-white transition-colors delay-100 hover:text-black flex item-center gap-1 max-sm:px-4">
        View All Products
        <ArrowOutwardIcon className="font-bold" />
      </button>
    </section>
  );
};

export default PaddingGiverHoc(ShopBySeason);
