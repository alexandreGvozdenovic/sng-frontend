export default function (count = 0, action) {
    if(action.type === 'changeSuggestionCount') {
        var newCount = count + action.value;
        return newCount
    } else if (action.type === 'resetSuggestionCount'){
        var newCount = 0;
        return newCount;
    } else {
        return count
    }
};