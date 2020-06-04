import React, { useState } from 'react';
import { SafeAreaView, View, Text, StatusBar, Platform, StyleSheet, ImageBackground} from 'react-native';
import { Button, Badge } from 'react-native-elements';
import {
  useFonts,
  PTSans_400Regular,
  PTSans_700Bold,
  OpenSans_400Regular,
  OpenSans_700Bold,
} from '@expo-google-fonts/dev';
import { AppLoading } from 'expo';
import { AntDesign } from '@expo/vector-icons';
import Header from './headerScreen.component';



var backgroundTexture = require('../assets/images/Texture.png');

function FilterScreen() {

  const [quartier,setQuartier] = useState('Combat');

  let [fontsLoaded] = useFonts({
    PTSans_400Regular,
    PTSans_700Bold,
    OpenSans_400Regular,
    OpenSans_700Bold
  });
  if(!fontsLoaded) {
      return (
          <AppLoading />
      )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={backgroundTexture} style={styles.container}>
        <Header/>
            <Text style={styles.title}>Un peu moins de hasard ?</Text>
            <Text style={styles.subtitle}>Commence par choisir parmi ces propositions :</Text>
            <View style={styles.containerBadges}>
                <Badge 
                    containerStyle={{marginRight: 8, marginTop:8}} 
                    value={
                        <Text style={styles.badgeActiveText}>
                                <AntDesign name="check" size={16} color="#FFFFFF" />
                            Bar
                        </Text>}
                    badgeStyle={styles.badgeActiveStyle}
                    />
                <Badge 
                    containerStyle={{marginRight: 8, marginTop:8}} 
                    value={
                        <Text style={styles.badgeInactiveText}>
                            Restaurant
                        </Text>}
                    badgeStyle={styles.badgeInactiveStyle}
                    />
                <Badge 
                    containerStyle={{marginRight: 8, marginTop:8}} 
                    value={
                        <Text style={styles.badgeInactiveText}>
                            Club
                        </Text>}
                    badgeStyle={styles.badgeInactiveStyle}
                    />
                <Badge 
                    containerStyle={{marginRight: 8, marginTop:8}} 
                    value={
                        <Text style={styles.badgeInactiveText}>
                            Spectacle
                        </Text>}
                    badgeStyle={styles.badgeInactiveStyle}
                    />
            </View>
            <View style={styles.btnContainer}>
                <Button
                    title="Montre-moi les résultats"
                    titleStyle={styles.btnText}
                    buttonStyle={styles.btnPrimary}
                    onPress={() => console.log('Simple Button pressed')}
                />
            </View>
        </ImageBackground>
      </SafeAreaView>
      
    )
  };
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  //   justifyContent:'center',
  //   alignItems:'center',
  },
  headerBackground:{
      backgroundColor: '#ffffff',
      height:42,
      width:375,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1,

      elevation: 3,
  },
  headerLogo: {
      textAlign:'center',
      color: '#FF8367',
      fontFamily: 'PTSans_400Regular',
      fontStyle:'italic',
      fontSize: 24,
    },
  title: {
      fontFamily: 'PTSans_700Bold',
      fontSize: 32,
      fontWeight:'bold',
      marginLeft: 26,
      marginTop: 96,
      width:320,
  },
  subtitle: {
      fontFamily: 'OpenSans_400Regular',
      fontSize: 16,
      fontWeight:'bold',
      marginLeft: 26,
      marginTop: 16,
      width:320,
  },
  suggestionImage: {
    width:320,
    height:150, 
    borderRadius:8, 
    marginBottom:8
  },
  pickerContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  cardContainer: {
    width:'auto',
    borderRadius:8,
    borderWidth:.5,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,

    elevation: 3,
},
  featuredTitle:{
    textAlign:'left',
    fontFamily:'PTSans_700Bold',
    fontSize:24,
    lineHeight:31,
    color:"#FFFFFF",
  },
  btnContainer:{
      flex:1,
      alignItems:'center',
      marginTop:48,
  },
  btnPrimary: {
    backgroundColor: "#FF8367",
    borderRadius:8,
    width:320,
    height:56,
  },
  btnText:{
    fontFamily:'PTSans_700Bold',
    fontSize:18,
    lineHeight:23,
    color:"#FFFFFF",
  },
  containerBadges: {
      display:'flex', 
      flexDirection:'row',
      flexWrap:'wrap', 
      alignItems:"center",
      marginTop:16, 
      marginLeft:26,
      marginEnd: 26,
    },
  badgeActiveText: {
      fontSize: 16,
      lineHeight:22,
      fontFamily:'OpenSans_400Regular',
      color:'#FFFFFF', 
      paddingHorizontal: 16, 
      paddingVertical: 3
    },
  badgeInactiveText: {
      fontSize: 16,
      lineHeight:22,
      fontFamily:'OpenSans_400Regular',
      color:'#FF8367', 
      paddingHorizontal: 16, 
      paddingVertical: 3
    },
  badgeActiveStyle: {
      backgroundColor: 'rgba(255, 131, 103, 1)',
      borderColor: '#FF8367',
      height:28,
      borderRadius: 20
    },
  badgeInactiveStyle: {
      backgroundColor: '#FFFFFF',
      borderColor: '#FF8367',
      height:28,
      borderRadius: 20,
      borderWidth:1,
    },
  text: {
      color: '#2A2B2A',
      fontFamily:'OpenSans_400Regular',
      fontSize: 14,
      marginTop:8

  },
});

export default FilterScreen
  
  

    
