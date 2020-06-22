import React from "react";
import { Button } from "react-native-elements";
import { Fontisto } from "@expo/vector-icons";
import { connect } from "react-redux";

<<<<<<< HEAD
const APIUrl = 'https://shake-n-go.herokuapp.com' // 'http://localhost:3000/shake' indiquer ici l'url du backend
function ShakerButton ({navigation, changeSuggestionCount, changeSuggestionNumber, suggestionCount, changeShakeCount, userPosition, userType, userRadius, storeSuggestions, launchAnim, shakeCount}) {

  async function getSuggestions(userPosition, userType, userRadius) {
    let rawResponse = await fetch(APIUrl, {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body: `position=${userPosition.latitude},${userPosition.longitude}&type=${userType}&radius=${userRadius}`
      })
    console.log('en front voici le retour du fetch:',rawResponse.status)
    if(rawResponse.status < 305) {
      response = await rawResponse.json()
      storeSuggestions(response.suggestions);
    } else {
      await getSuggestions(userPosition, userType, userRadius);
=======
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
        console.log("en front voici le retour du fetch:", rawResponse.status);
        if (rawResponse.status < 305) {
            response = await rawResponse.json();
            storeSuggestions(response.suggestions);
        } else {
            await getSuggestions(userPosition, userType, userRadius);
        }
>>>>>>> 3b683c0d247e7137db25ee27fa91ead86e341bbd
    }

    async function shake(userPosition, userType, userRadius) {
        if (shakeCount < 12 && suggestionCount === 0) {
            launchAnim(true);
            await getSuggestions(userPosition, userType, userRadius);
            launchAnim(false);
            changeSuggestionCount(1);
            changeSuggestionNumber(suggestionCount);
            changeShakeCount(1);
        } else if (shakeCount === 12) {
            console.log("je dois aller à la home");
            changeShakeCount(1);
        } else {
            changeSuggestionCount(1);
            changeSuggestionNumber(suggestionCount);
            changeShakeCount(1);
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
