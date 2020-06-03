import React, { useState } from 'react';
import { SafeAreaView, View, Text, StatusBar, Platform, StyleSheet, Image, ImageBackground, TextInput, Picker } from 'react-native';
import { Button, Card } from 'react-native-elements';
import {
  useFonts,
  PTSans_400Regular,
  PTSans_700Bold,
  OpenSans_400Regular,
  OpenSans_700Bold,
} from '@expo-google-fonts/dev';
import { AppLoading } from 'expo';
import { AntDesign } from '@expo/vector-icons';


var backgroundTexture = require('../assets/images/Texture.png');
var pizzaBackground = require('../assets/images/pizzabackground.png');
const {quartiers} = require('../scripts/quartiers');

console.log(quartiers)

function HomeScreen() {

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
          <View style={styles.headerBackground}>
              <Text style={styles.headerLogo}> Shake'n'Go </Text>
          </View>
          {/* <Image source={require('../assets/images/pizzabackground.png')} style={styles.suggestionImage}></Image> */}

          <Text style={styles.title}>On sort ?</Text>
          <View style={styles.pickerContainer}>
          <Picker
            selectedValue={quartier}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
              setQuartier({language: itemValue})
            }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
            <Button
              title="On y va !"
              buttonStyle={styles.btnPrimary}
              onPress={() => console.log('Simple Button pressed')}/>        
            </View>

          {/* <AntDesign name="enviromento" size={24} color="rgba(42, 43, 42, 0.4)" /> */}
          <TextInput style={styles.locationInput} name="" id=""></TextInput>


  
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
      fontWeight:'bold',
      fontSize: 24
    },
  title: {
      fontFamily: 'PTSans_700Bold',
      fontSize: 32,
      fontWeight:'bold',
      marginLeft: 26,
      marginTop: 32
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
  btnPrimary: {
    backgroundColor: "#FF8367",
    borderRadius:8,
    width:320
  },
  containerBadges: {
      display:'flex', 
      flexDirection:'row',
      flexWrap:'wrap', 
      // alignItems:'center', 
      marginTop:8, 
      marginLeft:26,
      marginEnd: 26,
    },
  badgeText: {
      fontSize: 16,
      fontFamily:'OpenSans_400Regular',
      color:'#FF8367', 
      paddingHorizontal: 16, 
      paddingVertical: 3
    },
  badgeActiveStyle: {
      backgroundColor: 'rgba(255, 131, 103, 0.24)',
      borderColor: '#FF8367',
      height:28,
      borderRadius: 20
    },
  badgeInactiveStyle: {
      backgroundColor: '#FFFFFF',
      borderColor: '#FF8367',
      height:28,
      borderRadius: 20
    },
  text: {
      color: '#2A2B2A',
      fontFamily:'OpenSans_400Regular',
      fontSize: 14,
      marginTop:8

  },
});

          {/* <List>
            <DatePicker
              value=''
              mode="date"
              defaultDate={new Date()}
              minDate={new Date(2015, 7, 6)}
              maxDate={new Date(2026, 11, 3)}
              onChange={() => {}}
              format="YYYY-MM-DD"
              >
              <List.Item arrow="horizontal">Select Date</List.Item>
            
            </DatePicker> 
          </List> */}
// const styles = StyleSheet.create({
//   header:{
//     left: "0%",
//     right: "0%",
//     top: "0%",
//     bottom: "0%",
//     maxHeight: "60px",
//     // /* Cloud */
    
//     backgroundColor: "#FFFFFF",
//     shadowOffset:{width: 0, height: 8},
//     shadowRadius: 16,
//     shadowColor: "#2a2b2a",
//   },
//   container: {
//     flex: 1,
//     justifyContent:'center',
//     alignItems:'center',
//     backgroundColor: '#ffffff',
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
//   },
//   h1: { 
//     textAlign: "center",
//     fontFamily: "PT Sans",
//     fontStyle: "italic",
//     fontWeight: "bold",
//     fontSize: 24,
//     lineHeight: 31,
//     paddingTop: 3,
//     color: "#FF8367",
    
//   },
  
//   content: {
//     marginTop: "112px",
//     marginLeft: "auto",
//     marginRight: "auto",
//     width: "80%",
//   },
  
//   bottomleft : {
//     /* Envie de pizza ? */
//     /* H2 */
    
//     fontFamily: "PT Sans",
//     fontStyle: "normal",
//     fontWeight: "bold",
//     fontSize: 24,
//     lineHeight: 31,
//     /* identical to box height */
    
    
//     color: "#FFFFFF",
//     position: "absolute",
//     width: "164px",
//     height: "31px",
//     left: "48px",
//     top: "179px",
//   },
  
//   image: {
//     borderRadius: 8,
//     width: "100%",
//     minHeight: "100px",
//     backgroundImage: 'url("restaurant.webp")',
//     backgroundSize: "cover",
//   },
  
//   input: {
    
//     /* Cloud */
    
//     backgroundColor: "#FFFFFF",
//     border: "1px solid rgba(42, 43, 42, 0.16)",
//     boxSizing: "borderBox",
//     borderRadius: "8px",
//     width: "100%",
//     padding: "15px",
    
    
//   },
  
//   locationInput: {
//     marginBottom: "16px",
    
//   },
  
//   btnPrimary: {
    
//     /* Salmon */
    
//     backgroundColor: "#FF8367 !important",
//     borderColor: "#FF8367 !important",
//     marginTop: "32px",
    
//   },
  
//   /* H2 */
  
//   title : {
    
//     fontFamily: "PT Sans",
//     fontStyle: "normal",
//     fontWeight: "bold",
//     fontSize: "32px",
//     lineHeight: "41px",
//     marginTop:"32px",
//     marginBottom: "32px",
    
//   }
// });  

export default HomeScreen
  
  
  