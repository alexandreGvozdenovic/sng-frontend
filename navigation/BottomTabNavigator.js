import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Badge, Button } from 'react-native-elements';

//navigation
import StackNavigator from './StackNavigator';
import BookmarksScreen from '../components/bookmarksScreen.component';

//icons
// import { Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import ShakerButton from './ShakerButton';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

function ButtonTest () {
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
      onPress={() => console.log('Je clique')}
    />
  )
}

function Shaker(){
  return null
}
export default function BottomTabNavigator({ navigation, route }) {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}
        tabBarOptions={{
            activeTintColor: '#FF8367',
            inactiveTintColor:'rgba(42, 43, 42, 0.4)',
        }}
    >
      <BottomTab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntDesign color={color} name="home" size={24} />,
        }}
      />
      <BottomTab.Screen 
        name='Shaker'
        component={Shaker}
        options={{
          tabBarIcon: () => (<ShakerButton/>),
          tabBarLabel: () => null
        }}
      
      />
      {/* <BottomTab.Screen
        name="Result"
        component={ResultScreen}
        options={{
          title: 'Result',
          tabBarIcon: ({ color }) => <AntDesign color={color} name="shake" size={24} />,
        }}
      /> */}
      <BottomTab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          title: 'Bookmarks',
          tabBarIcon: ({ color }) => <AntDesign color={color} name="hearto" size={24} />,
        }}
      />
      {/* <BottomTab.Screen
        name="Filter"
        component={FilterScreen}
        options={{
          title: 'Filter',
          tabBarIcon: ({ color }) => <AntDesign color={color} name="hearto" size={24} />,
        }}
      /> */}
    </BottomTab.Navigator>
  );
}