export default function(wishlist = [], action) {
    if(action.type === 'addToWishlist') {
        console.log('je suis dans le reducer wishlist', action.place)
        let newWishList = [...wishlist, action.place];
        return newWishList;
    } else {
        return wishlist;
    }
};