import * as Yup from "yup";
export const ResetPasswordValidation = Yup.object({
  newpassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .min(8, "Too Short!")
    .required("Please enter your new password"),
  confirmnewpassword: Yup.string().oneOf(
    [Yup.ref("newpassword"), null],
    "Password does not matches"
  ),
});
