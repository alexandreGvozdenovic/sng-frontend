export default function (count = 0, action) {
    if(action.type === 'changeSuggestionCount') {
        console.log('compteur à suggestion augmente !')
        var newCount = count + action.value;
        return newCount
    } else if (action.type === 'resetSuggestionCount'){
        console.log('je reset le compteur');
        var newCount = 0;
        return newCount;
    } else {
        return count
    }
};