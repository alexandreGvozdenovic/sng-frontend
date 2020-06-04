//navigation
// import HomeScreen from './components/pickerScreen.component';
// import ResultScreen from './components/resultScreen.component';
// import BookmarksScreen from './components/bookmarksScreen.component';
// import FilterScreen from './components/filterScreen.component';
// import TestPicker from './components/picker.component';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createAppContainer } from 'react-navigation';
//icons
// import { Icon } from 'react-native-elements';
// import { AntDesign } from '@expo/vector-icons';
console.disableYellowBox = true;
import React from 'react';
import { StyleSheet, StatusBar, Platform, View } from 'react-native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


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
        <Stack.Navigator 
          screenOptions={{headerShown: false}}

        >
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        </Stack.Navigator>
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
  