import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  addWishlistAsync,
  removeWishlistAsync,
} from "../wishlist/wishlistSlice";
import { addCartItemAsync, updateCartItemAsync } from "../cart/cartSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
export default function Product({ items, setProgress, progress }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wishlistVal, setWishlistVal] = useState([]);
  const cartStoreValue = useSelector((state) => state.cart.cartvalue);
  const userData = useSelector((state) => state.user.userData);
  const wishlistData = useSelector((state) => state.wishlist.wishlistData);
  const wishlist = useSelector((state) => state.wishlist);
  const pending = useSelector((state) => state.cart.pending);

  useEffect(() => {
    if (userData && userData._id) {
      setWishlistVal(wishlistData);
    } else {
    }
  }, [wishlistData]);
  useEffect(() => {
    if (userData && userData._id) {
    } else {
      const localData = JSON.parse(localStorage.getItem("wishlist"));
      if (localData && localData.length) {
        setWishlistVal(localData);
      }
    }
  }, []);

  if (items == undefined) return null;

  const AddToCartClickHandle = async (items) => {
    setProgress(progress + 10);
    const isItemInCart =
      cartStoreValue &&
      cartStoreValue.find((cartItem) => cartItem.product._id == items._id);
    if (isItemInCart) {
      const change = { quantity: isItemInCart.quantity + 1 };
      dispatch(
        updateCartItemAsync({
          userID: userData._id,
          productID: items._id,
          change: change,
        })
      );
      setProgress(progress + 100);
      return;
    }
    let value = {
      product: items._id,
      quantity: 1,
      createdAt: new Date(),
    };
    if (userData && userData._id) {
      const newItem = {
        user: userData._id,
        product: items._id,
        quantity: 1,
      };
      dispatch(addCartItemAsync(newItem));
      setProgress(progress + 20);
    } else {
      const data = JSON.parse(localStorage.getItem("cartArray"));
      setProgress(progress + 30);
      if (data) {
        const dataVal = data.find((value) => value.product == items._id);
        if (dataVal) {
          const value = data.map((items) => {
            if (items.product == dataVal.product) {
              items.quantity = items.quantity + 1;
              console.log("items.title", items);
              toast(` You've changed the QUANTITY to ${items.quantity}`, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                style: { width: "30rem", textAlign: "center" },
              });
            }
            return items;
          });
          localStorage.setItem("cartArray", JSON.stringify(value));
          return;
        } else {
          localStorage.setItem("cartArray", JSON.stringify([...data, value]));
        }
      } else {
        localStorage.setItem("cartArray", JSON.stringify([value]));
      }
      toast.success("Added to the cart", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setProgress(progress + 100);
    // navigate("/cart");
  };

  const handleWishlistClick = (itemId, userId) => {
    setProgress(progress + 10);
    if (userData && userData._id) {
      if (wishlistData.find((item) => item.product._id === itemId)) {
        dispatch(removeWishlistAsync({ product: itemId, user: userId }));
        setProgress(progress + 30);
      } else {
        dispatch(addWishlistAsync({ product: itemId, user: userId }));
        setProgress(progress + 30);
      }
    } else {
      setProgress(progress + 30);
      const localData = JSON.parse(localStorage.getItem("wishlist"));
      if (localData && localData.length) {
        if (localData) {
          const targetIndex = localData.findIndex(
            (item) => item.product._id == itemId
          );
          if (targetIndex != -1) {
            localData.splice(targetIndex, 1);
            setWishlistVal(localData);
            localStorage.setItem("wishlist", JSON.stringify(localData));
            toast.success("Removed from the wishlist", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            const newItem = {
              product: { _id: itemId },
              userId: userId,
              createdAt: new Date(),
            };
            setWishlistVal([...wishlistVal, newItem]);
            localStorage.setItem(
              "wishlist",
              JSON.stringify([...localData, newItem])
            );
            toast.success("Added to the wishlist", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        } else {
        }
      } else {
        const newItem = {
          product: { _id: itemId },
          createdAt: new Date(),
          userId: null,
        };

        setWishlistVal([newItem]);

        localStorage.setItem("wishlist", JSON.stringify([newItem]));
        toast.success("Added to the wishlist", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
    setProgress(progress + 1005);
  };
  return (
    <div className="cursor-pointer h-[100%] max-md:h-[24rem] max-sm:w-[18rem] max-mobileSize:h-[20rem]  max-mobileSize:w-[15rem] max-mobileSize:text[14px]  relative border  flex max-md:w-[16rem] w-80 flex-col rounded-xl pb-2 bg-white bg-clip-border text-gray-700 shadow-md gap-2 mx-auto">
      <div className="relative mx-4 -mt-6 h-[10rem] lg:h-[15rem] overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-blue-gray-500/40 bg-gradient-to-r  bg-transparent shadow-2xl">
        <img
          src={items.thumbnail}
          alt={items.title}
          className="object-cover bg-white h-full w-full"
          onClick={() => navigate(`/productoverview/${items._id}`)}
        />
        <p className="absolute bg-black rounded-full top-3 left-4 text-xs p-1">
          {Math.floor(items.discountPercentage)}% off
        </p>
        <p className="absolute bg-transparent  rounded-full top-3 right-4 text-xs p-1 shadow-2xl">
          <button
            disabled={wishlist.pending}
            onClick={() => handleWishlistClick(items._id, userData._id)}
          >
            <FavoriteIcon
              className={`${
                wishlistVal?.find((item) => item.product._id === items._id)
                  ? "text-red-700"
                  : "text-[#000] opacity-30"
              }`}
              style={{ fontSize: "30px" }}
            />
          </button>
        </p>
      </div>
      <div className="px-6">
        <h5 className="mb-2 block font-sans capitalize text-[13px]  max-sm:text-[12px] font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {items.brand}
        </h5>
        <h5 className="mb-2 block font-sans capitalize   max-sm:text-[16px] font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {items.title}
        </h5>
        <p className="block font-sans lowercase text-base max-sm:text-[13px] font-light leading-relaxed text-inherit antialiased">
          {items.description}
        </p>
        {items.sizes && items.sizes.length ? (
          <h5 className="mb-2 mt-3  font-sans capitalize text-[13px]  max-sm:text-[12px]   leading-snug font-light jus tracking-normal text-blue-gray-900 antialiased flex gap-2">
            {" "}
            <span>Sizes :</span>
            {items.sizes.map((size) => (
              <span>{size}</span>
            ))}
          </h5>
        ) : null}
      </div>
      <div className="px-6 pt-6 flex justify-between items-center ">
        <h5 className="mb-2 block font-sans  font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          ${items.price}.00
        </h5>
        <p className="block font-sans text-base  max-sm:text-[13px] font-light leading-relaxed text-inherit antialiased">
          {" "}
          <button
            className={`overflow-hidden relative w-32 p-2 h-12 bg-black text-white border-none rounded-md text-[16px] font-normal cursor-pointer flex items-center justify-center  z-10 group max-mobileSize:w-[6rem] max-mobileSize:h-[2.5rem] ${
              pending ? "opacity-60" : "opacity-100"
            }`}
            onClick={() => AddToCartClickHandle(items)}
            disabled={pending}
          >
            Add to cart
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-purple-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
            <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-8 z-10  mx-auto">
              <AddShoppingCartIcon /> Add
            </span>
          </button>
        </p>
      </div>
    </div>
  );
}
