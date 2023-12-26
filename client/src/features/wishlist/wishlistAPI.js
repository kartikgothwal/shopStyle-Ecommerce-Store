 

export async function addWishlist(Items) {
  try {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/wishlist/additem`,
      { Items }
    );
  } catch (error) {
    return error.response;
  }
}
