export default function (number = 0, action) {
  if (action.type === "changeSuggestionNumber") {
    var newNumber = action.value;
    if (newNumber === 3) {
      return (newNumber = 0);
    } else {
      return newNumber;
    }
  } else if (action.type === "resetSuggestionNumber") {
    var newNumber = 0;
    return newNumber;
  } else {
    return number;
  }
}
