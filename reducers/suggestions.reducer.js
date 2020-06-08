export default function (array = [], action) {
    if(action.type === 'storeSuggestions') {
        let newArray = action.array;
        return newArray;
    } else {
        return array;
    }
};