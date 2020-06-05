console.disableYellowBox = true;
import React from 'react';
import { StyleSheet, StatusBar, Platform, View } from 'react-native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
//Redux
import {Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import userPosition from './reducers/userPosition.reducer';
import userType from './reducers/userType.reducer';
const store = createStore(combineReducers({userPosition, userType}))

// var BottomNav = createBottomTabNavigator({
//     Home:HomeScreen,
//     Results:ResultScreen,
//     Bookmarks:BookmarksScreen,
//     Filter:FilterScreen,
//     Picker:TestPicker,
//   }, {
//     defaultNavigationOptions:({navigation}) => ({
//       tabBarIcon:({tintColor}) => {
//         var iconName;
//         if (navigation.state.routeName ==='Home') {
//           iconName = 'home'
//         } else if (navigation.state.routeName ==='Results') {
//           iconName = 'shake'
//         } else if (navigation.state.routeName ==='Bookmarks','History') {
//           iconName = 'hearto'
//         } 
//         return <AntDesign name={iconName} size={24} color={tintColor} />;
//       }, 
//       tabBarOptions: {
//         activeTintColor: '#FF8367',
//         inactiveTintColor:'rgba(42, 43, 42, 0.4)',
//         tabStyle:{backgroundColor: '#ffffff'},
//       }
//     })
//   })
  
//   const Navigation = createAppContainer(BottomNav)
  
  const Stack = createStackNavigator();
  export default function App() {
    return (
      <View style={styles.container}>
      <NavigationContainer>
        <Provider store={store}>
        <Stack.Navigator 
          screenOptions={{headerShown: false}}

        >
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        </Stack.Navigator>
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
  