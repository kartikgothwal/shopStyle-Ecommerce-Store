import { useEffect, useState } from "react";
import { PaddingGiverHoc } from "../../components/hoc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [cart, setCart] = useState([]);
  const productData = useSelector((state) => state.product.productdata);
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    if (userData && userData._id) {
    } else {
      const cartVal = JSON.parse(localStorage.getItem("cartArray"));
      console.log(cartVal);
      if (cartVal && cartVal.length && productData.length) {
        setCart(
          productData.filter((items) => {
            return cartVal.find((values) => {
              return values.product == items._id;
            });
          })
        );
      } else {
        setCart(null);
      }
    }
  }, [productData, userData]);
  console.log("cart", cart);
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
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={cartval.thumbnail}
                        alt={cartval.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={""}>{cartval.title}</a>
                          </h3>
                          <p className="ml-4">
                            ${Number(cartval.price).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Price: {Number(cartval.price).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {1}</p>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
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
              <p>Subtotal</p>
              <p>$262.00</p>
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
