import React from "react";
import { PaddingGiverHoc } from "../hoc";
import { useDispatch, useSelector } from "react-redux";
import { AddNewsletter } from "../../features/newletter/newsLetterSlice";
import { useFormik } from "formik";
import { NewLetterValidation } from "../../schemas/newsletter";
import ButtonLoadingAnimation from "../../layout/ButtonLoadingAnimation";

const NewLetter = () => {
  const pending = useSelector((state) => state.newsletter.pending);
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: NewLetterValidation,
      onSubmit: (values, action) => {
        dispatch(AddNewsletter(values));
        action.resetForm();
      },
    });
  return (
    <section className=" mb-[5rem] py-8 px-[7rem] max-lg:px-[5rem] flex justify-center items-center h-[100%] bg-[#116dff] text-white">
      <div className="  gap-3 h-full w-full flex flex-col ustify-center items-center ">
        <h1 className="text-4xl max-md:text-2xl">Newsletter</h1>
        <p className="text-xl max-lg:text-sm flex justify-center item-center text-center">
          Sign up to receive updates on new arrivals and special offers
        </p>
        <div className=" my-2 relative w-full h-full flex items-center justify-center  max-md:flex-col ">
          <form
            className="  relative gap-2 flex w-[50%] justify-center flex-col items-center max-md:items-center"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="email"
              className="max-md:text-xs after:contents:(*)"
            >
              Email
              <span className="  after:content-['*'] text-red-800 after:text-xs after:mr-2"></span>
            </label>
            {errors.email && touched.email ? (
              <span className="text-white text-[10px]">{errors.email}</span>
            ) : null}
            <input
              type="text"
              className="outline-none max-md:h-8 text-center text-black font-light h-12 rounded-[22px] z-10 max-md:w-[14rem] max-md:text-xs px-5 w-[25rem] md:text-center"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button
              type="submit"
              className="max-md:w-[15rem]  h-10 hover:border   transition-color duration-300 hover:bg-transparent hover:border-white hover:text-white  px-10 py-[-2] my-4 rounded-[22px] bg-black  z-20 text-white md:ml[-20px] "
            >
              {pending ? <ButtonLoadingAnimation /> : <span>Subscribe</span>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PaddingGiverHoc(NewLetter);
