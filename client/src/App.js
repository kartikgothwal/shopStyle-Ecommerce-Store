import React, { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import { fetchProductAsync } from "./features/products/productSlice";
import Cookies from "js-cookie";
import { AuthUserCheck } from "./features/userAuth/UserAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar.jsx";
import ComponentLoaderAnimation from "./layout/ComponentLoaderAnimation.jsx";
import {
  addCartItemAsync,
  getCartItemAsync,
} from "./features/cart/cartSlice.js";

import { getAddressAsync } from "./features/address/addressSlice.js";
import {
  addWishlistAsync,
  getWishlistAsync,
} from "./features/wishlist/wishlistSlice.js";
const Main = lazy(() => import("./components/FilterProductsPages/Main.jsx"));
const Address = lazy(() => import("./features/address/Address.js"));
const Footer = lazy(() => import("./layout/Footer"));
const PageNotFound = lazy(() => import("./layout/PageNotFound"));
const Home = lazy(() => import("./components/HomeComponents/Homes.jsx"));
const UserLogin = lazy(() => import("./features/userAuth/UserLogin"));
const UserRegister = lazy(() => import("./features/userAuth/userRegister"));
const Forgotpassword = lazy(() =>
  import("./features/userAuth/Forgotpassword.js")
);
const ResetPassword = lazy(() =>
  import("./features/userAuth/ResetPassword.js")
);
const Order = lazy(() => import("./features/order/Order.js"));
const Cart = lazy(() => import("./features/cart/Cart"));
const Wishlist = lazy(() => import("./features/wishlist/Wishlist.js"));
const OrderSuccessful = lazy(() =>
  import("./features/order/OrderSuccessful.js")
);
const TrackOrder = lazy(() => import("./features/order/TrackOrder.js"));
const ProductOverview = lazy(() =>
  import("./features/products/ProductOverview")
);
const App = () => {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    const getCookie = () => {
      const UserRefreshToken = Cookies.get("refresh-token");
      if (UserRefreshToken) {
        dispatch(AuthUserCheck(UserRefreshToken));
      }
    };
    const getProducts = () => {
      dispatch(fetchProductAsync());
    };
    getCookie();
    getProducts();
  }, []);
  useEffect(() => {
    if (userData && userData._id) {
      const localStorageData = JSON.parse(localStorage.getItem("cartArray"));
      if (localStorageData && localStorageData.length) {
        const itemdoc = localStorageData.map((itemVal) => {
          const newItem = {
            user: userData._id,
            ...itemVal,
          };
          return newItem;
        });

        dispatch(addCartItemAsync(itemdoc));
      }
      const wishlistLocalData = JSON.parse(localStorage.getItem("wishlist"));

      if (wishlistLocalData && wishlistLocalData.length) {
        const itemdoc = wishlistLocalData.map((itemVal) => {
          const newItem = {
            user: userData._id,
            ...itemVal,
          };
          return newItem;
        });
        dispatch(addWishlistAsync(itemdoc));
      }
      localStorage.clear();
    }
  }, [userData]);

  useEffect(() => {
    if (userData && userData._id) {
      dispatch(getCartItemAsync(userData._id));
      dispatch(getAddressAsync({ user: userData._id }));
      dispatch(getWishlistAsync({ user: userData._id }));
    }
  }, [dispatch, userData]);

  return (
    <>
      <Router>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<ComponentLoaderAnimation />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/user-login"
            element={
              <Suspense fallback={<ComponentLoaderAnimation />}>
                <UserLogin />
              </Suspense>
            }
          />
          <Route
            path="/user-register"
            element={
              <Suspense fallback={<ComponentLoaderAnimation />}>
                <UserRegister />
              </Suspense>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<ComponentLoaderAnimation />}>
                <Forgotpassword />
              </Suspense>
            }
          />
          <Route
            path="/resetpassword/:userID/:token"
            element={
              <Suspense fallback={<ComponentLoaderAnimation />}>
                <ResetPassword />
              </Suspense>
            }
          />
          <Route
            path="/product/:category"
            element={
              <Suspense fallback={<ComponentLoaderAnimation />}>
                <Main setProgress={setProgress} progress={progress} />
              </Suspense>
            }
          />
          <Route
            path="/productoverview/:productID"
            element={
              <Suspense fallback={<ComponentLoaderAnimation />}>
                <ProductOverview
                  setProgress={setProgress}
                  progress={progress}
                />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<ComponentLoaderAnimation />}>
                <Cart setProgress={setProgress} progress={progress} />
              </Suspense>
            }
          />
          <Route
            path="/order"
            element={
              <Suspense fallback={<ComponentLoaderAnimation />}>
                <Order setProgress={setProgress} progress={progress} />
              </Suspense>
            }
          />
          <Route
            path="/myaddress"
            element={
              <Suspense fallback={<ComponentLoaderAnimation />}>
                <Address setProgress={setProgress} progress={progress} />
              </Suspense>
            }
          />
          <Route
            path="/ordersuccessful"
            element={
              <Suspense fallback={<ComponentLoaderAnimation />}>
                <OrderSuccessful
                  setProgress={setProgress}
                  progress={progress}
                />
              </Suspense>
            }
          />
          <Route
            path="/trackorders"
            element={
              <Suspense fallback={<ComponentLoaderAnimation />}>
                <TrackOrder setProgress={setProgress} progress={progress} />
              </Suspense>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Suspense fallback={<ComponentLoaderAnimation />}>
                <Wishlist setProgress={setProgress} progress={progress} />
              </Suspense>
            }
          />
          <Route
            path="/*"
            element={
              <Suspense fallback={<ComponentLoaderAnimation />}>
                <PageNotFound />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
