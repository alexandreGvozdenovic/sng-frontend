import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//navigation
import StackNavigator from './StackNavigator';
import BookmarksScreen from '../components/bookmarksScreen.component';

//icons
// import { Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import ShakerButton from './ShakerButton';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

function Shaker(){
  return null
}
export default function BottomTabNavigator({ navigation, route }) {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}
        tabBarOptions={{
            activeTintColor: '#FF8367',
            inactiveTintColor:'rgba(42, 43, 42, 0.4)',
            style: {
              backgroundColor:'#FFFFFF',
              borderTopColor:'transparent',
              shadowColor:'transparent',
              elevation:0
            }}
          }>
      <BottomTab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntDesign color={color} name="home" size={24} />,
        }}/>
      <BottomTab.Screen 
        name='Shaker'
        component={Shaker}
        options={{
          tabBarIcon: () => (<ShakerButton/>),
          tabBarLabel: () => null
        }}/>
      <BottomTab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          title: 'Bookmarks',
          tabBarIcon: ({ color }) => <AntDesign color={color} name="hearto" size={24} />,
        }}/>
    </BottomTab.Navigator>
  );
}