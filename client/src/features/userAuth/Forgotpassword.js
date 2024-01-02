import React, { useState } from "react";
import { PaddingGiverHoc } from "../../components/hoc";
import { styles } from "../../utils/Style";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { NewLetterValidation } from "../../schemas/newsletter";
import axios from "axios";
import { toast } from "react-toastify";
import { ButtonLoadingAnimation } from "../../layout";

const Forgotpassword = () => {
  const [backendError, setBackendError] = useState(false);
  const [pending, SetPending] = useState(false);
  const initialValue = {
    email: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValue,
      validationSchema: NewLetterValidation,
      onSubmit: async (values, action) => {
        setBackendError(false);
        SetPending(true);
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/auth/user/forgotpassword`,
            values
          );
          const { message } = data;
          SetPending(false);
          toast.success(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } catch (error) {
          const {
            data: { message },
          } = error.response;
          SetPending(false);
          setBackendError(message);
          toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        action.resetForm();
      },
    });
  return (
    <>
      <section className={`${styles.sectionFormatting}`}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6   lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Forgot Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  {errors.email && touched.email ? (
                    <span className="text-red-600 text-[12px]">
                      {errors.email}
                    </span>
                  ) : null}
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600     gap-2"
                >
                  {pending ? (
                    <>
                      {" "}
                      Please wait <ButtonLoadingAnimation />
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>

            {backendError && (
              <p className="mt-2 text-center text-sm text-red-500">
                {backendError}
              </p>
            )}

            <p className=" mt-4 text-center text-sm text-gray-500">
              Not a member?{" "}
              <NavLink
                to="/user-register"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(PaddingGiverHoc(Forgotpassword));
