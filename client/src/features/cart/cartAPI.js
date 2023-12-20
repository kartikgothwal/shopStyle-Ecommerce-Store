import axios from "axios";

export async function addCartItem(item) {
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/additem`, {
    item: item,
  });
}
export async function getCartItem(userID) {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/cart/getitems`,
    { userID: userID }
  );
}
export async function updateCartItem(userID, productID, change) {
  console.log("update", userID, productID, change);
  return await axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/cart/updateitem`,
    { userID: userID, productID: productID, change: change }
  );
}
export async function deleteCartItem(userID, ProductID) {
  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/cart/deleteitem`,
    {
      data: {
        userID: userID,
        ProductID: ProductID,
      },
    }
  );
}
