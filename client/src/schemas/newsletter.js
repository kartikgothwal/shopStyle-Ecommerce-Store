import * as Yup from "yup";
export const NewLetterValidation = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
});
