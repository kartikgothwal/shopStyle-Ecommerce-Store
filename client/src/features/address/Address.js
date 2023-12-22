import React, { useEffect, useState } from "react";
import countryCityState from "countrycitystatejson";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PageNotFound } from "../../layout";
import { addressValidation } from "../../schemas/address";
import { addAddressAsync, getAddressAsync } from "./addressSlice";

const Address = ({ valid }) => {
  const [statesVal, SetStateval] = useState([]);
  const [citiesVal, SetcitiesVal] = useState([]);
  const userData = useSelector((state) => state.user.userData);
  const userAddress = useSelector((state) => state.address.useraddress);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    street: "",
    city: "",
    state: "",
    country: "",
    contact: "",
    zipCode: "",
  };
  const [user, SetUser] = useState(null);
  useEffect(() => {
    SetUser(userData);
  }, [userData]);
  const { values, errors, handleSubmit, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: addressValidation,
      onSubmit: (values, action) => {
        let newItem = {
          ...values,
          user: userData._id,
        };
        dispatch(addAddressAsync(newItem));
      },
    });

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
  // useEffect(() => {
  //   console.log("again inside");
  //   if (userData && userData._id) {
  //     dispatch(getAddressAsync({ user: userData._id }));
  //   }
  // }, [dispatch]);

  return (
    <>
      {user && user._id ? (
        <section
          className={`${
            valid
              ? "mt-[2rem]"
              : "max-sm:mt-[9rem] mt-[11rem] mb-[2rem] lg:mx-[10rem] px-4"
          }`}
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-xl lg:text-2xl font-semibold leading-7 text-gray-900">
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
                          type="number"
                          name="contact"
                          id="contact"
                          pattern="[0-9]*"
                          value={values.contact}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                          placeholder="e.g.: 8391119900"
                          style={{
                            WebkitAppearance: "none",
                            MozAppearance: "textfield",
                            margin: 0,
                          }}
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
                        value={values.street}
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
                              <option key={stateItems} value={stateItems}>
                                {stateItems}
                              </option>
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
                              <option key={cityItems} value={cityItems}>
                                {cityItems}
                              </option>
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
                        value={values.zipCode}
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
                className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
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
export default Address;
