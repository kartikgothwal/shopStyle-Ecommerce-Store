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
import Navbar from "./layout/Navbar";
import ComponentLoaderAnimation from "./layout/ComponentLoaderAnimation";
import Footer from "./layout/Footer";
const PageNotFound = lazy(() => import("./layout/PageNotFound"));
const Home = lazy(() => import("./components/homecomponents/index"));
const UserLogin = lazy(() => import("./features/userAuth/UserLogin"));
const UserRegister = lazy(() => import("./features/userAuth/userRegister"));
const Main = lazy(() => import("./components/filterproductspages/Main.jsx"));
const Cart = lazy(() => import("./features/cart/Cart"));
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
        localStorage.clear();
      }
    }
  }, [userData]);

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
