import React, { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import LoadingBar from "react-top-loading-bar";
import { fetchProductAsync } from "./features/products/productSlice";
import Cookies from "js-cookie";
import { AuthUserCheck } from "./features/userAuth/UserAuthSlice";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ComponentLoaderAnimation from "./components/ComponentLoaderAnimation";
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const Home = lazy(() => import("./components/HomeComponents/Home"));
const UserLogin = lazy(() => import("./features/userAuth/UserLogin"));
const UserRegister = lazy(() => import("./features/userAuth/userRegister"));
const Main = lazy(() => import("./components/FilterProductsPages/Main"));
const ProductOverview = lazy(() =>
  import("./features/products/ProductOverview")
);
const App = () => {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
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

  return (
    <>
      <Router>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Navbar />
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
            path="/*"
            element={
              <Suspense fallback={<ComponentLoaderAnimation />}>
                <PageNotFound />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
