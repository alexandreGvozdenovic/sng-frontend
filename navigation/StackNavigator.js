import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//navigation
import HomeScreen from '../components/pickerScreen.component';
import ResultScreen from '../components/resultScreen.component';
import ResultScreenDetail from '../components/resultScreenDetails.component';
import FilterScreen from '../components/filterScreen.component';

const Stack = createStackNavigator();


export default function StackNavigator({ navigation, route }) {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen 
                name="Result" 
                component={ResultScreen} 
                options={{
                    gestureDirection:"vertical", 
                }}/>
            <Stack.Screen 
                name="Details" 
                component={ResultScreenDetail} 
                options={{
                    gestureDirection:"vertical",
                }}/>
            <Stack.Screen name="Filter" component={FilterScreen} />
        </Stack.Navigator>     
    )
};

const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };