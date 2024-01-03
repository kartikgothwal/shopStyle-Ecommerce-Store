import React, { useEffect, useState } from "react";
import { PaddingGiverHoc } from "../../components/hoc";
import { styles } from "../../utils/Style";
import { useFormik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ResetPasswordValidation } from "../../schemas/resetpassword";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ButtonLoadingAnimation, PageNotFound } from "../../layout";

const ResetPassword = () => {
  var memoizedVal = {};
  const navigate = useNavigate();
  const [pending, SetPending] = useState(false);
  const [verifiedUser, SetVerifiedUser] = useState(false);
  const { token, userID } = useParams();
  async function verifyUser(token, userID) {
    if (memoizedVal["token"] == token || memoizedVal["userID"] == userID) {
      return null;
    }
    memoizedVal["token"] = token;
    memoizedVal["userID"] = userID;
    try {
      const {
        data: { user },
      } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/user/forgotpassword/confirmuser`,
        { userID, token }
      );

      SetVerifiedUser(user);
    } catch (error) {
      console.log(
        "🚀 ~ file: ResetPassword.js:33 ~ verifyUser ~ error:",
        error
      );
      SetVerifiedUser(false);
      const {
        data: { message },
      } = error.response;
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
  }
  useEffect(() => {
    verifyUser(token, userID);
  }, [token, userID]);
  const [showToggle, SetShowToggle] = useState({
    newpassword: false,
    confirmnewpassword: false,
  });
  const initialValue = {
    newpassword: "",
    confirmnewpassword: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValue,
      validationSchema: ResetPasswordValidation,
      onSubmit: async (values, action) => {
        SetPending(true);
        try {
          const {
            data: { message },
          } = await axios.patch(
            `${process.env.REACT_APP_BACKEND_URL}/auth/user/resetpassword`,
            { values, verifiedUser }
          );
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
          navigate("/user-login");
        } catch (error) {
          const {
            data: { message },
          } = error.response;
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
        SetPending(false);
      },
    });
  const handlePasswordVisibility = (choice) => {
    if (choice == "newpassword") {
      SetShowToggle({ ...showToggle, newpassword: !showToggle.newpassword });
    } else {
      SetShowToggle({
        ...showToggle,
        confirmnewpassword: !showToggle.confirmnewpassword,
      });
    }
  };
  return (
    <>
      {verifiedUser ? (
        <section className={`${styles.sectionFormatting}`}>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6   lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Confirm New Password
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="newpassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                  <div className="mt-2">
                    {errors.newpassword && touched.newpassword ? (
                      <span className="text-red-600 text-[12px]">
                        {errors.newpassword}
                      </span>
                    ) : null}
                    <div className="w-full border  focus:ring-2 focus:ring-inset ring-inset  focus:ring-indigo-600 rounded-md overflow-hidden  flex justify-center items-center   shadow-sm ">
                      <input
                        type={showToggle.newpassword ? "text" : "password"}
                        name="newpassword"
                        id="newpassword"
                        autoComplete="off"
                        value={values.newpassword}
                        placeholder="Enter new password"
                        className="block w-full py-1.5 text-gray-900  placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2 outline-none bg-transparent"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {showToggle.newpassword ? (
                        <VisibilityIcon
                          className="cursor-pointer"
                          onClick={() =>
                            handlePasswordVisibility("newpassword")
                          }
                        />
                      ) : (
                        <VisibilityOffIcon
                          className="cursor-pointer"
                          onClick={() =>
                            handlePasswordVisibility("newpassword")
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirmnewpassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm New Password
                    </label>
                  </div>
                  <div className="mt-2">
                    {errors.confirmnewpassword && touched.confirmnewpassword ? (
                      <span className="text-red-600 text-[12px]">
                        {errors.confirmnewpassword}
                      </span>
                    ) : null}
                    <div className="w-full border  focus:ring-2 focus:ring-inset ring-inset  focus:ring-indigo-600 rounded-md overflow-hidden  flex justify-center items-center   shadow-sm ">
                      <input
                        type={
                          showToggle.confirmnewpassword ? "text" : "password"
                        }
                        name="confirmnewpassword"
                        id="confirmnewpassword"
                        autoComplete="off"
                        value={values.confirmnewpassword}
                        placeholder="confirm new password"
                        className="block w-full py-1.5 text-gray-900  placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2 outline-none "
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {showToggle.confirmnewpassword ? (
                        <VisibilityIcon
                          className="cursor-pointer"
                          onClick={() =>
                            handlePasswordVisibility("confirmnewpassword")
                          }
                        />
                      ) : (
                        <VisibilityOffIcon
                          className="cursor-pointer"
                          onClick={() =>
                            handlePasswordVisibility("confirmnewpassword")
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {pending ? (
                      <>
                        {" "}
                        Please wait <ButtonLoadingAnimation className="mx-2" />
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <PageNotFound
          statusCode={401}
          message={"Unauthorized Access"}
          items={"You are not authorized for this page"}
        />
      )}
    </>
  );
};

export default React.memo(PaddingGiverHoc(ResetPassword));
