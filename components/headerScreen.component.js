import React from 'react';
import { 
  Text, 
  View,
  StyleSheet} from 'react-native';
import { AppLoading } from 'expo';
import {
  useFonts,
  PTSans_700Bold_Italic
} from '@expo-google-fonts/dev';

export default function HeaderScreen() {

  let [fontsLoaded] = useFonts({
    PTSans_700Bold_Italic,
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
    fontFamily: 'PTSans_700Bold_Italic',
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
    justifyContent: 'center',
    borderBottomColor: 'rgba(42, 43, 42, 0.08)',
    borderBottomWidth: 0.8
  }
});



