export default function (wishlist = [], action) {
  if (action.type === "addToWishlist") {
    let newWishlist = [...wishlist, action.place];
    return newWishlist;
  } else {
    return wishlist;
  }
}
