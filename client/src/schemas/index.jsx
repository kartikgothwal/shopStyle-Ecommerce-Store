import * as Yup from "yup";

export const signUpSchema = Yup.object({
  firstname: Yup.string()
    .min(2, "should be min 2 characters!")
    .max(25, "should be less than 25 characters!")
    .required("Please enter your firstname"),
  lastname: Yup.string()
    .min(2, "should be min 2 characters!")
    .max(25, "should be less than 25 characters!")
    .required("Please enter your lastname"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .min(8, "Too Short!")
    .required("Please enter your password"),
});

export const signInSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .min(8, "Too Short!")
    .required("Please enter your password"),
});
