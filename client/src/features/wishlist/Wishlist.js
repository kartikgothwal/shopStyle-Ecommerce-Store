import { useEffect, useState } from "react";
import { PaddingGiverHoc } from "../../components/hoc";
import { useDispatch, useSelector } from "react-redux";
import { DataLoaderAnimation } from "../../layout";
import { useNavigate } from "react-router-dom";
import { getWishlistAsync, removeWishlistAsync } from "./wishlistSlice";
import { toast } from "react-toastify";
const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wishlistVal, setwishlistVal] = useState(undefined);
  const wishlistData = useSelector((state) => state.wishlist.wishlistData);
  const userData = useSelector((state) => state.user.userData);
  const pending = useSelector((state) => state.wishlist.pending);
  const ProductData = useSelector((state) => state.product.productdata);
  useEffect(() => {
    if (userData && userData._id) {
      if (wishlistData.length) {
        setwishlistVal(wishlistData);
      } else {
        setwishlistVal([]);
      }
    }
  }, [wishlistData, userData]);

  useEffect(() => {
    if (userData && userData._id) {
    } else {
      const localWishlistData = JSON.parse(localStorage.getItem("wishlist"));
      if (localWishlistData && localWishlistData.length) {
        const Item = ProductData.filter((product) => {
          return localWishlistData.find(
            (item) => item.product._id == product._id
          );
        }).map((item) => {
          return { product: item };
        });
        setwishlistVal(Item);
      }
    }
  }, [ProductData]);

  const handleWishlistRemoveClick = (itemId, userId) => {
    if (userData && userData._id) {
      dispatch(removeWishlistAsync({ product: itemId, user: userId }));
    } else {
      const remainingItems = wishlistVal.filter((values) => {
        return values.product?._id !== itemId;
      });
      setwishlistVal(remainingItems);
      const localWishlistItem = JSON.parse(localStorage.getItem("wishlist"));
      const targetIndex = localWishlistItem.findIndex(
        (item) => item.product._id == itemId
      );
      if (targetIndex != -1) {
        localWishlistItem.splice(targetIndex, 1);
        localStorage.setItem("wishlist", JSON.stringify(localWishlistItem));
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
      }
    }
  };
  return (
    <>
      {wishlistVal && wishlistVal.length ? (
        <section className="mt-[8rem] lg:mx-[10rem]  ">
          <h1 className="text-3xl font-bold text-gray-900 font-rubik">
            Wishlist
          </h1>
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {wishlistVal &&
                  wishlistVal.map((item) => (
                    <li key={item._id} className="flex py-6">
                      <div
                        className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 cursor-pointer"
                        onClick={() =>
                          navigate(`/productoverview/${item.product._id}`)
                        }
                      >
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <button
                                onClick={() =>
                                  navigate(
                                    `/productoverview/${item.product._id}`
                                  )
                                }
                              >
                                {item.product.title}
                              </button>
                            </h3>
                            <p className="ml-4">
                              ${Number(item.product.price).toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-black">
                            Brand:{" "}
                            <span className="text-gray-700">
                              {item.product.brand}
                            </span>
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.description}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between mt-3 text-sm">
                          <div className="flex">
                            <button
                              type="button"
                              className={`font-medium ${
                                pending ? "opacity-70" : "opacity-100"
                              } text-indigo-600 hover:text-indigo-500`}
                              onClick={() =>
                                handleWishlistRemoveClick(
                                  item.product._id,
                                  userData._id
                                )
                              }
                              disabled={pending}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => navigate(-1)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </section>
      ) : (
        <div className="mt-[10rem]">
          {pending ? (
            <div role="status mx-auto">
              <DataLoaderAnimation />
            </div>
          ) : (
            <>
              <p className="mt-6 text-xl text-center leading-7 text-gray-600">
                No items inside wishlist
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => navigate(-1)}
                >
                  Explore products
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default PaddingGiverHoc(Wishlist);
