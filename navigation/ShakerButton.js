import React from "react";
import { Button } from "react-native-elements";
import { Fontisto } from "@expo/vector-icons";
import { connect } from "react-redux";

const APIUrl = "https://shake-n-go.herokuapp.com/shake"; // indiquer ici l'url du backend
function ShakerButton({
  navigation,
  changeSuggestionCount,
  changeSuggestionNumber,
  suggestionCount,
  changeShakeCount,
  userPosition,
  userType,
  userRadius,
  storeSuggestions,
  launchAnim,
  shakeCount,
}) {
  async function getSuggestions(userPosition, userType, userRadius) {
    let rawResponse = await fetch(APIUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `position=${userPosition.latitude},${userPosition.longitude}&type=${userType}&radius=${userRadius}`,
    });
    if (rawResponse.status < 305) {
      response = await rawResponse.json();
      storeSuggestions(response.suggestions);
    } else {
      await getSuggestions(userPosition, userType, userRadius);
    }
  }

<<<<<<< HEAD
  async function shake(userPosition, userType, userRadius) {
    if (shakeCount < 12 && suggestionCount === 0) {
      launchAnim(true);
      await getSuggestions(userPosition, userType, userRadius);
      launchAnim(false);
      changeSuggestionCount(1);
      changeSuggestionNumber(suggestionCount);
      changeShakeCount(1);
    } else if (shakeCount === 12) {
      changeShakeCount(1);
    } else {
      changeSuggestionCount(1);
      changeSuggestionNumber(suggestionCount);
      changeShakeCount(1);
=======
    async function shake(userPosition, userType, userRadius) {
        if (shakeCount < 12 && suggestionCount === 0) {
            launchAnim(true);
            await getSuggestions(userPosition, userType, userRadius);
            launchAnim(false);
            changeSuggestionCount(1);
            changeSuggestionNumber(suggestionCount);
            changeShakeCount(1);
        } else if (shakeCount === 12) {
            changeShakeCount(1);
        } else {
            changeSuggestionCount(1);
            changeSuggestionNumber(suggestionCount);
            changeShakeCount(1);
        }
>>>>>>> a4cdd1476bdc6ab0d782f6d75317a807da1228cb
    }
  }

  return (
    <Button
      containerStyle={{
        bottom: 8,
      }}
      buttonStyle={{
        backgroundColor: "#FF8367",
        borderRadius: 40,
        width: 56,
        height: 56,
        borderWidth: 4,
        borderColor: "#fff",
      }}
      icon={<Fontisto name="cocktail" size={24} color="#fff" />}
      onPress={() => shake(userPosition, userType, userRadius)}
    />
  );
}

function mapStateToProps(state) {
  return {
    suggestionCount: state.suggestionCount,
    userPosition: state.userPosition,
    userType: state.userType,
    userRadius: state.userRadius,
    shakeCount: state.shakeCount,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSuggestionCount: function (value) {
      dispatch({ type: "changeSuggestionCount", value: value });
    },
    changeSuggestionNumber: function (value) {
      dispatch({ type: "changeSuggestionNumber", value: value });
    },
    changeShakeCount: function (value) {
      dispatch({ type: "changeShakeCount", value: value });
    },
    storeSuggestions: function (array) {
      dispatch({ type: "storeSuggestions", array: array });
    },
    launchAnim: function (status) {
      dispatch({ type: "launchAnim", status: status });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShakerButton);
