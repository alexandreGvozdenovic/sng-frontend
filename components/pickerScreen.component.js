import React, { useState } from 'react';
import { SafeAreaView, View, Text, StatusBar, Platform, StyleSheet, Image, ImageBackground, TextInput, Picker } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import {
  useFonts,
  PTSans_400Regular,
  PTSans_700Bold,
  OpenSans_400Regular,
  OpenSans_700Bold,
} from '@expo-google-fonts/dev';
import { AppLoading } from 'expo';
import 'intl';
import 'intl/locale-data/jsonp/fr-FR';
import Header from './headerScreen.component';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';


var backgroundTexture = require('../assets/images/Texture.png');
var pizzaBackground = require('../assets/images/pizzabackground.png');
const {quartiers} = require('../scripts/quartiers');


function HomeScreen() {

  const [quartier, setQuartier] = useState();
  const [position, setPosition] = useState();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
 
  const onSubmit = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(!show);
    setMode(currentMode);
  };
 
  const showDatepicker = () => {
    showMode('date');
  };
 
  const toggleOverlay = () => {
    setVisible(!visible);
  }

  // Quartier picker infos
  let displayListeQuartiers;
  displayListeQuartiers = quartiers.map(q => {
    return <Picker.Item key={q.value} label={q.label} value={q.label} position={q.value}/>
  })

  let displayTitle;
  if(quartier) {
    displayTitle = quartier;
  } else {
    displayTitle = `Choisis ton quartier !`
  }

  //Date picker infos
  var displayDatePicker;
  if(show) {
      displayDatePicker = <DateTimePicker
                              testID="dateTimePicker"
                              locale="fr-FR"
                              value={date}
                              mode={mode}
                              display="default"
                              onChange={onChange}
                            />
  }

  var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};

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
          <ImageBackground source={backgroundTexture} style={styles.background}>
          <Header/>
          <View style={styles.suggestionImageContainer}>
            <Image source={require('../assets/images/pizzabackground.png')} style={styles.suggestionImage}></Image>
          </View>
          <Text style={styles.suggestionText}>Envie de pizza?</Text>

          <Text style={styles.title}>On sort ?</Text>
          <View style={styles.pickerContainer}>
            <View>
              <Button 
                  onPress={() => {console.log('list picker')}}
                  icon={          
                    <AntDesign name="enviromento" size={24} color="rgba(42, 43, 42, 0.4)" />
                } 
                  title={`${quartiers[0].label}`}
                  titleStyle={styles.pickerText}
                  buttonStyle={styles.pickers} 
                  />
              <Button 
                  onPress={() => {showDatepicker();toggleOverlay()}}
                  icon={          
                    <AntDesign name="calendar" size={24} color="rgba(42, 43, 42, 0.4)" />
                } 
                  title={`${new Intl.DateTimeFormat('fr-FR', options).format(date)}`}
                  titleStyle={styles.pickerText}
                  buttonStyle={styles.pickers} 
                  />
            </View>
            <Button
              title="On y va !"
              titleStyle={styles.btnTextOK}
              buttonStyle={styles.btnPrimary}
              onPress={() => console.log(date)}/>        
          </View>

          <TextInput style={styles.locationInput} name="" id=""></TextInput>

          <Overlay isVisible={visible} onBackdropPress={() => {toggleOverlay();showDatepicker()}}>
            <Text style={styles.overlayText}>Alors si c'est pas ce soir, c'est quand ?</Text>
            <View style={{width:320, height:240}}>
              {displayDatePicker}
            </View>
            <View style={styles.overlayBtns}>
              <Button
                title="Fermer"
                titleStyle={styles.btnTextDismiss}
                buttonStyle={styles.btnModalDismiss}
                onPress={() => {toggleOverlay();showDatepicker()}}/> 
            </View>
          </Overlay>
  
        </ImageBackground>
      </SafeAreaView>
      
    )
  };
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
      marginTop: 48
  },
  suggestionImageContainer: {
    marginTop:32,
    alignItems:"center",
  },
  suggestionImage: {
    width:320,
    height:150, 
    borderRadius:8,
  },
  suggestionText: {
    color:'#FFFFFF',
    fontFamily: 'PTSans_700Bold',
    fontWeight:'bold',
    fontSize: 24,
    lineHeight:31,
    marginLeft: 48,
    marginTop:-40,
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
    width:320,
    height:56,
    marginTop:16,
  },
  containerBadges: {
      display:'flex', 
      flexDirection:'row',
      flexWrap:'wrap', 
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
  pickers:{
    backgroundColor:'#FFFFFF',
    borderWidth:1,
    borderColor:'rgba(42, 43, 42, 0.16)',
    width:320,
    marginBottom:16,
    justifyContent:'flex-start',
  },
  pickerText:{
    color:'rgba(42, 43, 42, 0.8)',
    fontFamily:'OpenSans_400Regular',
    fontSize: 16,
    lineHeight: 22,
    marginLeft:10,
  },
  overlayText:{
    textAlign:'left',
    fontFamily:'PTSans_700Bold',
    color: '#FF8367',
    width:250,
    fontSize:24,
    lineHeight:31,
    marginTop:8, 
    marginLeft:16,
  },
  overlayBtns:{
    alignItems:'flex-end'
  },
  btnModalSubmit:{
    width:150,
    margin:10,
    backgroundColor:'#FF8367'
  },
  btnTextOK:{
    fontFamily:'PTSans_700Bold',
    fontSize:18,
    lineHeight:23,
    color:"#FFFFFF",
  },
  btnTextDismiss:{
    fontFamily:'PTSans_700Bold',
    fontSize:18,
    lineHeight:23,
    color:"#FF8367",
  },
  btnModalDismiss:{
    width:150,
    margin:10,
    backgroundColor:'#FFFFFF',
    borderWidth:1,
    borderColor:"#FF8367"
  },
  background: {
    height:'100%'
  }
});


export default HomeScreen
  
  
  