import React, { useEffect, useState } from "react";
import { AuthUserRegistration, resetError } from "./UserAuthSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "../../schemas";
import { ButtonLoadingAnimation } from "../../layout";
const UserRegister = () => {
  const [showToggle, SetShowToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const users = useSelector((state) => state.user);
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        dispatch(AuthUserRegistration(values));
        action.resetForm();
      },
    });

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  useEffect(() => {
    if (userData && userData._id) {
      navigate("/");
    }
  }, [userData]);
  return (
    <>
      <section className="max-sm:mt-[2rem] mt-[5rem]  h-screen w-full  flex items-center justify-center">
        <div className="border-3 border-red min-h-[20rem] w-[30rem] gap-4  p-4 flex flex-col items-center justify-start ">
          <h1 className="text-lg font-semibold uppercase">Sign Up</h1>
          <p className="text-center max-sm:text-[15px] font-light">
            Already have an account?
            <NavLink
              className="underline ml-2 text-blue-600"
              to={"/user-login"}
            >
              Sign in
            </NavLink>{" "}
          </p>
          <p className="text-red-700 text-sm">
            {users.error ? users.error : null}
          </p>
          <form
            onSubmit={handleSubmit}
            className=" gap-4 h-full w-full  flex flex-col  "
          >
            <div className="flex flex-col  gap-1">
              <label htmlFor="firstname">
                First name:
                <span className="  after:content-['*'] text-red-800 after:text-xs after:mr-2"></span>
              </label>
              {errors.firstname && touched.firstname ? (
                <span className="text-red-600 text-[10px]">
                  {errors.firstname}
                </span>
              ) : null}
              <input
                name="firstname"
                id="firstname"
                autoComplete="off"
                value={values.firstname}
                placeholder="Enter first name here"
                className="capitalize border border-gray-300 bg-slate-100  outline-none rounded px-2 py-2 max-sm:py-1  font-light text-sm"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="flex flex-col  gap-1">
              <label htmlFor="lastname">
                Last name:
                <span className="  after:content-['*'] text-red-800 after:text-xs after:mr-2"></span>
              </label>
              {errors.lastname && touched.lastname ? (
                <span className="text-red-600 text-[10px]">
                  {errors.lastname}
                </span>
              ) : null}
              <input
                name="lastname"
                id="lastname"
                autoComplete="off"
                value={values.lastname}
                placeholder="Enter last name here"
                className="capitalize border border-gray-300 bg-slate-100  outline-none rounded px-2 py-2 max-sm:py-1 font-light text-sm"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">
                Email:
                <span className="  after:content-['*'] text-red-800 after:text-xs after:mr-2"></span>
              </label>
              {errors.email && touched.email ? (
                <span className="text-red-600 text-[10px]">{errors.email}</span>
              ) : null}
              <input
                name="email"
                id="email"
                autoComplete="off"
                value={values.email}
                placeholder="Enter email here"
                className="border border-gray-300 bg-slate-100  outline-none rounded px-2 py-2 max-sm:py-1  font-light text-sm"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">
                Password:
                <span className="  after:content-['*'] text-red-800 after:text-xs after:mr-2"></span>
              </label>
              {errors.password && touched.password ? (
                <span className="text-red-600 text-[10px]">
                  {errors.password}
                </span>
              ) : null}
              <div className="w-full border border-gray-300 flex justify-center items-center rounded bg-slate-100 ">
                <input
                  type={showToggle ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={values.password}
                  placeholder="Enter password here"
                  className="  bg-transparent  outline-none rounded px-2 py-2 font-light text-sm w-full"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {showToggle ? (
                  <VisibilityIcon
                    className="cursor-pointer"
                    onClick={() => SetShowToggle(!showToggle)}
                  />
                ) : (
                  <VisibilityOffIcon
                    className="cursor-pointer"
                    onClick={() => SetShowToggle(!showToggle)}
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="max-md:w-[100%]  h-10 hover:border   transition-color duration-300 hover:bg-transparent    px-10 py-[-2] my-4 rounded  bg-black hover:text-black hover:border-black z-20 text-white md:ml[-20px] w-full flex justify-center items-center gap-4"
            >
              Sign up
              {users.pending ? <ButtonLoadingAnimation /> : null}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UserRegister;
