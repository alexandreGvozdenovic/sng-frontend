export default function (isRadius = 1500, action) {
    if(action.type === 'expandRadius') {
        console.log('reducer radius')
        let newIsRadius = 3000;
        return newIsRadius
    } else {
        return isRadius;
    }
}