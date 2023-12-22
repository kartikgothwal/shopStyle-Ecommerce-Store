import * as Yup from "yup";
export const addressValidation = Yup.object({
  street: Yup.string()
    .min(5, "should be min 5 characters!")
    .max(255, "should be max 255 characters!")
    .required("Please enter the street address"),
  city: Yup.string()
    .min(2, "should be min 2 characters!")
    .required("Please select the city"),
  state: Yup.string()
    .min(2, "should be min 2 characters!")
    .required("Please select the state"),
  country: Yup.string()
    .min(2, "should be min 2 characters!")
    .required("Please select the country"),
  contact: Yup.string()
    .matches(/^\d{10}$/, "Contact should be exactly 10 digits")
    .required("Please enter the contact"),

  countryCode: Yup.string()
    .min(2, "should be min 2 characters!")
    .min(5, "should be max 5 characters!")
    .required("Please select the countryCode"),
  zipCode: Yup.number()
    .min(6, "should be min 6 characters!")
    .max(8, "should be max 8 characters!")
    .required("Please select the zipCode"),
});
