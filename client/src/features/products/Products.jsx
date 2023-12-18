import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router";
export default function Product({ items }) {
  const navigate = useNavigate();
  if (items == undefined) return null;

  return (
    <div className="  cursor-pointer h-[100%] max-md:h-[24rem] max-sm:w-[18rem] max-mobileSize:h-[20rem]  max-mobileSize:w-[15rem] max-mobileSize:text[14px]  relative border  flex max-md:w-[16rem] w-80 flex-col rounded-xl pb-2 bg-white bg-clip-border text-gray-700 shadow-md gap-2 mx-auto">
      <div
        className="relative mx-4 -mt-6 h-[10rem] lg:h-[15rem] overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-blue-gray-500/40 bg-gradient-to-r  bg-transparent shadow-2xl"
        onClick={() => navigate(`/productoverview/${items._id}`)}
      >
        <img
          src={items.thumbnail}
          alt={items.title}
          className="object-cover bg-white h-full w-full"
        />
        <p className="absolute bg-black rounded-full top-3 left-4 text-xs p-1">
          {Math.floor(items.discountPercentage)}% off
        </p>
      </div>
      <div className="px-6">
        <h5 className="mb-2 block font-sans capitalize text-[13px]  max-sm:text-[12px] font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {items.brand}
        </h5>
        <h5 className="mb-2 block font-sans capitalize   max-sm:text-[16px] font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {items.title}
        </h5>
        <p className="block font-sans lowercase text-base max-sm:text-[13px] font-light leading-relaxed text-inherit antialiased">
          {items.description}
        </p>
        {items.sizes && items.sizes.length ? (
          <h5 className="mb-2 mt-3  font-sans capitalize text-[13px]  max-sm:text-[12px]   leading-snug font-light jus tracking-normal text-blue-gray-900 antialiased flex gap-2">
            {" "}
            <span>Sizes :</span>
            {items.sizes.map((size) => (
              <span>{size}</span>
            ))}
          </h5>
        ) : null}
      </div>
      <div className="px-6 pt-6 flex justify-between items-center ">
        <h5 className="mb-2 block font-sans  font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          ${items.price}.00
        </h5>
        <p className="block font-sans text-base  max-sm:text-[13px] font-light leading-relaxed text-inherit antialiased">
          {" "}
          <button
            className="overflow-hidden relative w-32 p-2 h-12 bg-black text-white border-none rounded-md text-[16px] font-normal cursor-pointer flex items-center justify-center  z-10 group max-mobileSize:w-[6rem] max-mobileSize:h-[2.5rem]"
            onClick={() => alert("hello world")}
          >
            Add to cart
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-purple-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
            <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-8 z-10  mx-auto">
              <AddShoppingCartIcon /> Add
            </span>
          </button>
        </p>
      </div>
    </div>
  );
}
