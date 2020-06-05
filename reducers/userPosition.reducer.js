export default function (position = '', action) {
    if(action.type === 'updateUserPosition') {
        let newPosition = action.position;
        return newPosition;
    } else {
        return position;
    }
};