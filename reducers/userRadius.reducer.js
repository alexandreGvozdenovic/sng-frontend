export default function (radius = 2000, action) {
  if (action.type === "expandRadius") {
    let newRadius = action.radius;
    return newRadius;
  } else {
    return radius;
  }
}
