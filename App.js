console.disableYellowBox = true;

import React from 'react';
//navigation
import HomeScreen from './components/pickerScreen.component';
import ResultScreen from './components/resultScreen.component';
import BookmarksScreen from './components/bookmarksScreen.component';
import FilterScreen from './components/filterScreen.component';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
//icons
// import { Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';


var BottomNav = createBottomTabNavigator({
    Home:HomeScreen,
    Results:ResultScreen,
    Bookmarks:BookmarksScreen,
    Filter:FilterScreen,
  }, {
    defaultNavigationOptions:({navigation}) => ({
      tabBarIcon:({tintColor}) => {
        var iconName;
        if (navigation.state.routeName ==='Home') {
          iconName = 'home'
        } else if (navigation.state.routeName ==='Results') {
          iconName = 'shake'
        } else if (navigation.state.routeName ==='Bookmarks','History') {
          iconName = 'hearto'
        } 
        return <AntDesign name={iconName} size={24} color={tintColor} />;
      }, 
      tabBarOptions: {
        activeTintColor: '#FF8367',
        inactiveTintColor:'rgba(42, 43, 42, 0.4)',
        tabStyle:{backgroundColor: '#ffffff'},
      }
    })
  })
  
  const Navigation = createAppContainer(BottomNav)
  
  export default function App() {
    return (
        <Navigation />
    );
  }
  