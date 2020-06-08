export default function (isRadius = false, action) {
    if(action.type === 'expandRadius') {
        console.log('reducer radius')
        let newIsRadius = true;
        return newIsRadius
    } else {
        return isRadius;
    }
}