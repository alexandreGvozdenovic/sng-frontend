import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { Fontisto } from '@expo/vector-icons';
import { connect } from 'react-redux';


function ButtonTest ({navigation, changeSuggestionCount, changeSuggestionNumber, suggestionCount, changeShakeCount, userPosition, userType, userRadius, storeSuggestions}) {
  
  async function getSuggestions(userPosition, userType, userRadius) {
    console.log('mon user Position :', userPosition.latitude,userPosition.longitude);
    console.log('mon user Radius :', userRadius);
    console.log('mon user Type :', userType);
    console.log(`j'interroge mon backend`);
    let rawResponse = await fetch('http://192.168.1.59:3000/shake', {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body: `position=${userPosition.latitude},${userPosition.longitude}&type=${userType}&radius=${userRadius}`
      })
    let response = await rawResponse.json()
    storeSuggestions(response.suggestions);
  };
  
  async function shake(userPosition, userType, userRadius) {
    if(suggestionCount === 0) {
      await getSuggestions(userPosition, userType, userRadius);
      changeSuggestionCount(1);
      changeSuggestionNumber(suggestionCount);
      changeShakeCount(1)
    } else {
      changeSuggestionCount(1);
      changeSuggestionNumber(suggestionCount);
      changeShakeCount(1)
    }
  }
  
  return (
    <Button 
      containerStyle={{
        bottom:8
      }}
      buttonStyle={{
        backgroundColor:'#FF8367',
        borderRadius:40,
        width:56,
        height:56,
        borderWidth:4,
        borderColor:'#fff',


      }}
      icon={
        <Fontisto name="cocktail" size={24} color="#fff" />
      }
      onPress={() => shake(userPosition, userType, userRadius)}
    />
  )
}

function mapStateToProps(state) {
  return {
    suggestionCount:state.suggestionCount,
    userPosition:state.userPosition,
    userType:state.userType,
    userRadius:state.userRadius,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeSuggestionCount: function(value) {dispatch({type:'changeSuggestionCount', value:value})}, 
    changeSuggestionNumber: function(value) {dispatch({type:'changeSuggestionNumber', value:value})}, 
    changeShakeCount: function(value) {dispatch({type:'changeShakeCount', value:value})},
    storeSuggestions: function(array) {dispatch({type:'storeSuggestions', array:array})},
  }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ButtonTest)