import {
  HomeCarousel,
  ProductsCategory,
  Brands,
  ShopByGender,
  ShopBySeason,
  JustLaunched,
  WeddingsSpecial,
  ForWardrobe,
  NewLetter,
} from "./index.js";

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
    </section>
  );
};

export default Home;
