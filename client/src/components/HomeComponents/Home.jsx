import React from "react";
import HomeCarousel from "./HomeCarousel";
import ProductsCategory from "./ProductsCategory";
import Brands from "./Brands";
import ShopByGender from "./ShopByGender";
import ShopBySeason from "./ShopBySeason";
import JustLaunched from "./JustLaunched";
import WeddingsSpecial from "./WeddingsSpecial";
import ForWardrobe from "./ForWardrobe";
import NewLetter from "./NewLetter";
import Footer from "../Footer";

const Home = () => {
  return (
    <section className="max-VerySmallmobileSize:top-[8rem] max-mobileSize:top-[8rem]  border-none  relative max-sm:top-[8rem] max-md:top-[9rem] top-[9rem] lg:top-[9rem] max-xl:top-[10rem] xl:top-[9rem] w-full min-h-screen">
      <HomeCarousel />
      <ProductsCategory />
      <Brands />
      <ShopByGender />
      <ShopBySeason />
      <JustLaunched />
      <WeddingsSpecial />
      <ForWardrobe />
      <NewLetter />

      <Footer />
    </section>
  );
};

export default Home;
