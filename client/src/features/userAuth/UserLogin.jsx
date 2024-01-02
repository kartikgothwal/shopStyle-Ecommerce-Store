import React, { useEffect, useState } from "react";
import { AuthUserLogin, resetError } from "./UserAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { signInSchema } from "../../schemas";
import { useNavigate } from "react-router-dom";
import { ButtonLoadingAnimation } from "../../layout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const UserLogin = () => {
  const [showToggle, SetShowToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);
  const userData = useSelector((state) => state.user.userData);
  const initialValues = {
    email: "",
    password: "",
  };
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signInSchema,
      onSubmit: (values, action) => {
        dispatch(AuthUserLogin(values));
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
      <section className=" h-screen w-full  flex items-center justify-center">
        <div className="min-h-[20rem] w-[30rem] gap-4  p-4 flex flex-col items-center justify-start ">
          <h1 className="text-lg font-semibold uppercase">Sign In</h1>
          <p className="text-center max-sm:text-[15px] font-light">
            Don't have an account?
            <NavLink
              className="underline ml-2 text-blue-600"
              to={"/user-register"}
            >
              Sign up
            </NavLink>{" "}
          </p>
          <p className="text-red-700 text-sm">
            {users.error ? users.error : null}
          </p>
          <form
            onSubmit={handleSubmit}
            className="gap-4 h-full w-full  flex flex-col"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email">
                Email:{" "}
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
                className="border border-gray-300 bg-slate-100  outline-none rounded px-2 py-2 font-light text-sm"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="flex flex-col gap-2">
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
              className="max-md:w-[100%]  h-10 hover:border   transition-color duration-300 hover:bg-transparent px-10 py-[-2] my-4 rounded  bg-black hover:text-black hover:border-black z-20 text-white md:ml[-20px] w-full flex justify-center items-center gap-4"
            >
              Sign In {users.pending ? <ButtonLoadingAnimation /> : null}
            </button>
          </form>
          <p className=" text-center text-sm text-gray-500">
            <NavLink
              to="/forgot-password"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Forgot Password?
            </NavLink>
          </p>
        </div>
      </section>
    </>
  );
};

export default UserLogin;
