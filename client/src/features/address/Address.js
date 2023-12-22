import React, { useEffect, useState } from "react";
import countryCityState from "countrycitystatejson";
import { useFormik } from "formik";
import { PaddingGiverHoc } from "../../components/hoc";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageNotFound } from "../../layout";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { addressValidation } from "../../schemas/address";
const Address = () => {
  const [statesVal, SetStateval] = useState([]);
  const [citiesVal, SetcitiesVal] = useState([]);

  const navigate = useNavigate();
  const initialValues = {
    street: "",
    countryshort: "",
    city: "",
    state: "",
    country: "",
    contact: "",
    countryCode: "",
    zipCode: "",
  };
  const [user, SetUser] = useState(null);
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    SetUser(userData);
  }, [userData]);
  const {
    values,
    errors,
    setValues,
    handleSubmit,
    touched,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: addressValidation,
    onSubmit: (values, action) => {
      return {};
    },
  });
  console.log("🚀 ~ file: address.js:45 ~ Address ~ values:", values);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    handleChange(event);

    const selectedCountryData = countryCityState
      .getCountries()
      .find((country) => country.name === selectedCountry);

    if (selectedCountryData) {
      const shortname = selectedCountryData.shortName;
      SetStateval(countryCityState.getStatesByShort(shortname));
    } else {
      console.error(`Country not found: ${selectedCountry}`);
    }
  };
  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    handleChange(event);
    const shortname = countryCityState
      .getCountries()
      .find((country) => country.name == values.country).shortName;
    SetcitiesVal(countryCityState.getCities(shortname, selectedState));
  };

  return (
    <>
      {user && user._id ? (
        <section className="mt-[8rem] lg:mx-[10rem]  ">
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base lg:text-2xl font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive the order.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:text-red-700"
                    >
                      First name
                    </label>

                    <div className="mt-2">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        value={user.firstname}
                        readOnly
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:text-red-700"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        value={user.lastname}
                        readOnly
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:text-red-700"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={user.email}
                        readOnly
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  px-3"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4   flex  flex-col md:flex-row  justify-between">
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:text-red-700"
                      >
                        Contact
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="contact"
                          id="contact"
                          pattern="[0-9]*"
                          values={values.contact}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                        />
                        {errors.contact && touched.contact ? (
                          <span className="text-red-600 text-[10px]">
                            {errors.contact}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:text-red-700"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          value={values.country} // Use value for the selected option
                          onChange={(event) => handleCountryChange(event)}
                          onBlur={handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option value="" disabled>
                            Please select a country
                          </option>
                          {countryCityState
                            .getCountries()
                            .sort((a, b) => {
                              const nameA = a.name.toLowerCase();
                              const nameB = b.name.toLowerCase();
                              if (nameA < nameB) {
                                return -1;
                              } else if (nameA > nameB) {
                                return 1;
                              } else {
                                return 0;
                              }
                            })
                            .map((item) => {
                              return (
                                <option key={item.name} value={item.name}>
                                  {item.name}
                                </option>
                              );
                            })}
                        </select>

                        {errors.country && touched.country ? (
                          <span className="text-red-600 text-[10px]">
                            {errors.country}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:text-red-700"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="street"
                        id="street"
                        values={values.street}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                      />
                      {errors.street && touched.street ? (
                        <span className="text-red-600 text-[10px]">
                          {errors.street}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:text-red-700"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <select
                        id="state"
                        name="state"
                        value={values.state} // Use value for the selected option
                        onChange={(e) => handleStateChange(e)}
                        onBlur={handleBlur}
                        className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        {!values.country && (
                          <option value="" disabled>
                            Please select a country first
                          </option>
                        )}
                        {values.country && (
                          <option value="" disabled>
                            Please select a state
                          </option>
                        )}
                        {statesVal && statesVal.length
                          ? statesVal.map((stateItems) => (
                              <option value={stateItems}>{stateItems}</option>
                            ))
                          : null}
                      </select>

                      {errors.state && touched.state ? (
                        <span className="text-red-600 text-[10px]">
                          {errors.state}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:text-red-700"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <select
                        id="city"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        {!values.state && (
                          <option value="" disabled>
                            Please select a state first
                          </option>
                        )}
                        {values.state && (
                          <option value="" disabled>
                            Please select a city
                          </option>
                        )}
                        {citiesVal && citiesVal.length
                          ? citiesVal.map((cityItems) => (
                              <option value={cityItems}>{cityItems}</option>
                            ))
                          : null}
                      </select>
                      {errors.city && touched.city ? (
                        <span className="text-red-600 text-[10px]">
                          {errors.city}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium leading-6 text-gray-900 after:content-['*'] after:text-red-700"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="zipCode"
                        id="zipCode"
                        values={values.zipCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                      />
                      {errors.zipCode && touched.zipCode ? (
                        <span className="text-red-600 text-[10px]">
                          {errors.zipCode}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </section>
      ) : (
        <PageNotFound
          message="Unauthorized Access"
          items={"You don't have the permission to access this page"}
        />
      )}
    </>
  );
};

export default PaddingGiverHoc(Address);
