export default function(wishlist = [], action) {
    if(action.type === 'addToWishlist') {
        // console.log('je suis dans le reducer wishlist', action.place)
        let newWishlist = [...wishlist, action.place];
        return newWishlist;
    } else {
        return wishlist;
    }
};