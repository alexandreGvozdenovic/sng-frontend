import * as React from 'react';
import { Button } from 'react-native-elements';
import { Fontisto } from '@expo/vector-icons';
import { connect } from 'react-redux';


function ButtonTest ({changeSuggestionCount, changeSuggestionNumber, suggestionCount, changeShakeCount}) {
    return (
      <Button 
        containerStyle={{
          bottom:13
        }}
        buttonStyle={{
          backgroundColor:'#FF8367',
          borderRadius:100,
          width:56,
          height:56,
          borderWidth:3,
          borderColor:'#fff'
        }}
        icon={
          <Fontisto name="cocktail" size={24} color="#fff" />
        }
        onPress={() => {changeSuggestionCount(1);changeSuggestionNumber(suggestionCount);changeShakeCount(1)}}
      />
    )
}

function mapStateToProps(state) {
  return {suggestionCount:state.suggestionCount}
}

function mapDispatchToProps(dispatch) {
  return {
    changeSuggestionCount: function(value) {dispatch({type:'changeSuggestionCount', value:value})}, 
    changeSuggestionNumber: function(value) {dispatch({type:'changeSuggestionNumber', value:value})}, 
    changeShakeCount: function(value) {dispatch({type:'changeShakeCount', value:value})}, 
  }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ButtonTest)