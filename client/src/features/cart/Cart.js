import { useEffect, useState } from "react";
import { PaddingGiverHoc } from "../../components/hoc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const Cart = ({ setProgress, progress }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [cart, setCart] = useState([]);
  const productData = useSelector((state) => state.product.productdata);
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    setProgress(progress + 10);
    if (userData && userData._id) {
      setProgress(progress + 30);
    } else {
      const cartVal = JSON.parse(localStorage.getItem("cartArray"));
      if (cartVal && cartVal.length && productData.length) {
        let cartdoc;
        setCart(
          productData
            .map((items) => {
              cartdoc = cartVal.find((values) => {
                return values.product == items._id;
              });
              if (cartdoc) {
                // console.log("card", cartdoc);
                // cartdoc.quantity
                const newItem = { ...items, quantity: cartdoc.quantity };
                return newItem;
              }
              return null;
            })
            .filter(Boolean)
        );
        setProgress(progress + 30);
      } else {
        setCart(null);
      }
    }
    window.scrollTo(0, 0);
    setProgress(progress + 100);
  }, [productData, userData]);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("cartArray"));
    if (cart && cart.length) {
      let doc;
      const values = localStorageData.map((items) => {
        doc = cart.find((val) => {
          return val._id == items.product;
        });
        if (doc) {
          const newItem = { ...items, quantity: doc.quantity };
          return newItem;
        }
      });
      localStorage.setItem("cartArray", JSON.stringify(values));
    }
  }, [cart]);

  const RemoveCartHandle = (item) => {
    setProgress(progress + 10);
    try {
      setProgress(progress + 30);
      if (userData && userData._id) {
      } else {
        const remainingItems = cart.filter((values) => {
          return values._id !== item._id;
        });
        setCart(remainingItems);
        const cartVal = JSON.parse(localStorage.getItem("cartArray"));
        // let value = cartVal.filter((items) => {
        //   return remainingItems.find((values) => {
        //     return items.product == values._id;
        //   });
        // });
        let doc;
        let value = cartVal
          .map((items) => {
            doc = remainingItems.find((values) => {
              return items.product == values._id;
            });
            if (doc) {
              const newItem = { ...items, quantity: doc.quantity };
              return newItem;
            }
            return null;
          })
          .filter(Boolean);

        if (remainingItems.length && value.length) {
          localStorage.setItem("cartArray", JSON.stringify(value));
        } else {
          localStorage.clear();
        }
      }
      toast.success("Item removed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setProgress(progress + 100);
    } catch (error) {
      setProgress(progress + 100);
      toast.error("Removing failed", {
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
  };
  const handleQuantityChange = (choice, item) => {
    if (choice == "dec") {
      setCart(
        cart.map((values) => {
          if (values._id == item._id) {
            if (values.quantity != 1) {
              values.quantity = values.quantity - 1;
            }
          }
          return values;
        })
      );
    } else if (choice == "inc") {
      setCart(
        cart.map((values) => {
          if (values._id == item._id) {
            values.quantity = values.quantity + 1;
          }
          return values;
        })
      );
    }
  };

  return (
    <>
      {cart && cart.length ? (
        <section className="mt-[8rem] lg:mx-[10rem]  ">
          <h1 className="text-3xl font-bold text-gray-900 font-rubik">
            Shopping cart
          </h1>
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cart.map((cartval) => (
                  <li key={cartval._id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 cursor-pointer">
                      <div
                        onClick={() =>
                          navigate(`/productoverview/${cartval._id}`)
                        }
                      >
                        <img
                          src={cartval.thumbnail}
                          alt={cartval.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <p
                              className="cursor-pointer"
                              onClick={() =>
                                navigate(`/productoverview/${cartval._id}`)
                              }
                            >
                              {cartval.title}
                            </p>
                          </h3>
                          <p className="ml-4">
                            $
                            {Number(cartval.price).toFixed(2) *
                              cartval.quantity}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Price: ${Number(cartval.price).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500 flex gap-2">
                          <button
                            class="cursor-pointer transition-all bg-blue-500 text-white  rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                            onClick={() => handleQuantityChange("dec", cartval)}
                            disabled={cartval.quantity == 1}
                          >
                            <RemoveIcon />
                          </button>

                          <p> Qty {Number(cartval.quantity)}</p>
                          <button
                            class="cursor-pointer transition-all bg-blue-500 text-white  rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                            onClick={() => handleQuantityChange("inc", cartval)}
                          >
                            <AddIcon />
                          </button>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => RemoveCartHandle(cartval)}
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
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Grand Total</p>
              <p>
                $
                {cart
                  .reduce((acc, currEle) => {
                    return acc + currEle.price * currEle.quantity;
                  }, 0)
                  .toFixed(2)}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </a>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
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
          <p className="mt-6 text-xl text-center leading-7 text-gray-600">
            No items inside cart
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
        </div>
      )}
    </>
  );
};
export default PaddingGiverHoc(Cart);
