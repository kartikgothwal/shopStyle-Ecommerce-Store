import React, { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { fetchProductAsync } from "./features/products/productSlice";
import Cookies from "js-cookie";
import { AuthUserCheck } from "./features/userAuth/UserAuthSlice";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ComponentLoaderAnimation from "./components/ComponentLoaderAnimation";
import CardShimmerEffect from "./components/CardShimmerEffect";
import PageNotFound from "./components/PageNotFound";
const Home = lazy(() => import("./components/HomeComponents/Home"));
const UserLogin = lazy(() => import("./features/userAuth/UserLogin"));
const UserRegister = lazy(() => import("./features/userAuth/userRegister"));
const Main = lazy(()=>import('./components/FilterProductsPages/Main'))
const App = () => {
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
                <Main />
              </Suspense>
            }
          />
          <Route path="/random" element={<CardShimmerEffect />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
