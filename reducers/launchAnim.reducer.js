export default function (status = false, action) {
  if (action.type === "launchAnim") {
    let newStatus = action.status;
    return newStatus;
  } else {
    return status;
  }
}
