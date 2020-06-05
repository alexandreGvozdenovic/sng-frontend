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
            <Stack.Screen name="Result" component={ResultScreen} />
            <Stack.Screen name="Details" component={ResultScreenDetail} />
            <Stack.Screen name="Filter" component={FilterScreen} />
        </Stack.Navigator>     
    )
};