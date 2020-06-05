import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Badge, Button } from 'react-native-elements';

//navigation
import HomeScreen from '../components/pickerScreen.component';
import ResultScreen from '../components/resultScreen.component';
import BookmarksScreen from '../components/bookmarksScreen.component';
import FilterScreen from '../components/filterScreen.component';

//icons
// import { Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

function ButtonTest () {
  return (
    <Button 
      title='test'
      buttonStyle={{
        backgroundColor:'#FF8367'
      }}
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
            showLabel: false
        }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Result',
          tabBarIcon: ({ color }) => <AntDesign color={color} name="home" size={24} />,
        }}
      />
      <BottomTab.Screen 
        name='Shaker'
        component={Shaker}
        options={{
          tabBarButton: () => (<ButtonTest/>)
        }}
      
      />
      <BottomTab.Screen
        name="Result"
        component={ResultScreen}
        options={{
          title: 'Result',
          tabBarIcon: ({ color }) => <AntDesign color={color} name="shake" size={24} />,
        }}
      />
      <BottomTab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          title: 'Bookmarks',
          tabBarIcon: ({ color }) => <AntDesign color={color} name="hearto" size={24} />,
        }}
      />
      <BottomTab.Screen
        name="History"
        component={FilterScreen}
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <AntDesign color={color} name="hearto" size={24} />,
        }}
      />
    </BottomTab.Navigator>
  );
}