export default function (count = 0, action) {
    if(action.type === 'changeShakeCount') {
        var newCount = count + action.value;
        return newCount
    } else if (action.type === 'resetShakeCount'){
        var newCount = 0;
        return newCount;
    } else if (action.type === 'setShakeCount'){
        var newCount = 12;
        return newCount;
    } else {
        return count
    }
};