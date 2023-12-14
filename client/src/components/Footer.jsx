import React from "react";
import { NavLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
const Footer = () => {
  return (
    <footer
      className="bg-[#ededed] mt-8 bg-center bg-cover w-full min-h-[30rem] max-lg:h-[105rem]    relative  bottom-0"
      style={{
        backgroundImage:
          "url(https://suta.in/cdn/shop/files/polka_dots.webp?v=1688196518)",
      }}
    >
      <div className="p-8 grid grid-cols-4 gap-12  max-lg:grid-cols-1 max-lg:grid-rows-4 max-lg:gap-4 h-full w-full py-4 px-12 absolute bottom-0">
        <div className=" rounded   flex flex-col px-4 py-2 gap-3 justify-start items-center bg-white  ">
          <ul className="font-light">
            <h1 className="uppercase font-semibold my-3 text-[#545252] text-left">
              Quick Links
            </h1>
            <li className="list-none text-[15px]">
              <NavLink className="  " to={"#"}>
                RETURN & EXCHANGE REQUEST
              </NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px]   ">
              Contact Us!
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              Frequently Asked Questions
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              <NavLink to={"#"}>We Are Hiring!</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>Wholesale Enquiries</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>ShopStyles.com</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>About Us</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              <NavLink to={"#"}>Bonus Coins</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>Terms of Service</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              <NavLink to={"#"}>Bonus Coins</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>Terms of Service</NavLink>
            </li>
          </ul>
        </div>
        <div className="rounded bg-white flex flex-col px-4 py-2 gap-3 justify-start items-center ">
          <ul className="font-light">
            <h1 className="uppercase font-semibold my-3 text-[#545252] text-left">
              Quick Links
            </h1>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>RETURN & EXCHANGE REQUEST</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>Contact Us!</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              <NavLink to={"#"}> Frequently Asked Questions </NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              <NavLink to={"#"}> We Are Hiring! </NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              <NavLink to={"#"}>Wholesale Enquiries </NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>ShopStyles.com</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>About Us</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>Bonus Coins</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>Terms of Service</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>Refund policy</NavLink>
            </li>
          </ul>
        </div>
        <div className="rounded bg-white flex flex-col px-4 py-2 gap-3 justify-start items-center ">
          <ul className="font-light">
            <h1 className="uppercase font-semibold my-3 text-[#545252] text-left">
              Quick Links
            </h1>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>RETURN & EXCHANGE REQUEST</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>Contact Us!</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              <NavLink to={"#"}> Frequently Asked Questions </NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              <NavLink to={"#"}> We Are Hiring! </NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              <NavLink to={"#"}>Wholesale Enquiries </NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>ShopStyles.com</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>About Us</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>Bonus Coins</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>Terms of Service</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px] ">
              {" "}
              <NavLink to={"#"}>Refund policy</NavLink>
            </li>
            <li className="list-none  max-sm:text-[14px]   text-[15px]  ">
              {" "}
              <NavLink to={"#"}>Franchise Enquiry</NavLink>
            </li>
          </ul>
        </div>
        <div className="rounded bg-white flex flex-col px-4 py-2 gap-3 justify-start items-center ">
          <ul>
            <h1 className="uppercase font-semibold my-3 text-[#545252] text-left">
              About Shop Styles
            </h1>
            <p className="font-light text-[15px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              nihil rem illum? Eligendi hic, saepe tenetur nobis repellat
              mollitia nam architecto impedit debitis repellendus earum veniam
              molestias? Voluptatem, ipsa et.
            </p>
            <p className="my-8 font-light  text-[15px]">
              Toll Free:<span className="underline"> 080-456-81713</span>
            </p>
            <p className="my-8  font-light text-[15px]">
              Email: info@shopstyles.in
            </p>
            <div className="  flex gap-4">
              <FacebookIcon
                className="cursor-pointer hover:scale-110 transition-transform duration-300 ease-in"
                style={{ color: "#545252" }}
              />
              <InstagramIcon
                className="cursor-pointer hover:scale-110 transition-transform duration-300 ease-in"
                style={{ color: "#545252" }}
              />
              <TwitterIcon
                className="cursor-pointer hover:scale-110 transition-transform duration-300 ease-in"
                style={{ color: "#545252" }}
              />
              <YouTubeIcon
                className="cursor-pointer hover:scale-110 transition-transform duration-300 ease-in"
                style={{ color: "#545252" }}
              />
            </div>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
