export default function (count = 0, action) {
    if(action.type === 'changeShakeCount') {
        var newCount = count + action.value;
        console.log('compteur de shake augmente !', newCount)
        return newCount
    } else if (action.type === 'resetShakeCount'){
        console.log('je reset le compteur de shake');
        var newCount = 0;
        return newCount;
    } else {
        return count
    }
};