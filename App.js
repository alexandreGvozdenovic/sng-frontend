console.disableYellowBox = true;
import React from 'react';
import { StyleSheet, StatusBar, Platform, View } from 'react-native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import StackNavigator from './navigation/StackNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import resultScreenDetails from './components/resultScreenDetails.component';
//Redux
import {Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import userPosition from './reducers/userPosition.reducer';
import userType from './reducers/userType.reducer';
import wishlist from './reducers/wishlist.reducer';
import suggestionCount from './reducers/suggestionCount.reducer';
import suggestionNumber from './reducers/suggestionNumber.reducer';
import shakeCount from './reducers/shakeCount.reducer';
import userRadius from './reducers/userRadius.reducer';
import suggestions from './reducers/suggestions.reducer';
import isAnim from './reducers/launchAnim.reducer';

const store = createStore(combineReducers({userPosition, userType, wishlist, suggestionCount, suggestionNumber, shakeCount, userRadius, suggestions, isAnim}))

  
const Stack = createStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Provider store={store}>
          <BottomTabNavigator>
            <StackNavigator/>
          </BottomTabNavigator>
        </Provider>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor:'#FFFFFF',
  }
});
  