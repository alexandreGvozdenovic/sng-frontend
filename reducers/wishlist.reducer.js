export default function(wishlist = [], action) {
    if(action.type === 'addToWihlist') {
        let newWishList = [...wishlist, action.place];
        return newWishList;
    } else {
        return wishlist;
    }
};