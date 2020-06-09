export default function (radius = 1500, action) {
    if(action.type === 'expandRadius') {
        let newRadius = action.radius;
        console.log('reducer radius. ma nouvelle valeur ', newRadius)
        return newRadius
    } else {
        return radius;
    }
}