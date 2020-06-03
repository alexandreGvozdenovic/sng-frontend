import React from 'react';
import { 
  Text, 
  View,
  StyleSheet} from 'react-native';
import { AppLoading } from 'expo';
import {
  useFonts,
  PTSans_400Regular,
  OpenSans_400Regular
} from '@expo-google-fonts/dev';

export default function HeaderScreen() {

  let [fontsLoaded] = useFonts({
    PTSans_400Regular,
    OpenSans_400Regular,
  });
  if(!fontsLoaded) {
    return (
      <AppLoading />
    )
  } else {
    return (

      <View style={styles.headerLogoContainer}>
        <Text style={styles.headerLogo}> Shake'n'Go </Text>
      </View>
  );
  }
}

const styles = StyleSheet.create({
  headerLogo: {
    textAlign:'center',
    color: '#FF8367',
    fontFamily: 'PTSans_400Regular',
    fontStyle:'italic',
    fontWeight:'bold',
    fontSize: 24
  },
  headerLogoContainer: {
    height: 56,
    width: '100%',
    backgroundColor:'#FFFFFF',
    display: 'flex',
    alignItems:'center',
    justifyContent: 'center'
  }
});



