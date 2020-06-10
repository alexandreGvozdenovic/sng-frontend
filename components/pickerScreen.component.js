import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StatusBar, Platform, StyleSheet, Image, ImageBackground, TextInput, Picker } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { useFonts, PTSans_400Regular, PTSans_700Bold, OpenSans_400Regular, OpenSans_700Bold} from '@expo-google-fonts/dev';
import { AppLoading } from 'expo';
import 'intl';
import 'intl/locale-data/jsonp/fr-FR';
import Header from './headerScreen.component';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'; 
import { connect } from 'react-redux';
import { Badge } from 'react-native-elements';

var backgroundTexture = require('../assets/images/Texture.png');
var pizzaBackground = require('../assets/images/pizzabackground.png');
const {arrondissements} = require('../scripts/arrondissements');

function HomeScreen({userPosition, updateUserPosition}) {

  const [arrondissement, setArrondissement] = useState();
  const [position, setPosition] = useState();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPositionPicker, setShowPositionPicker] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function askPermissions() {
        var { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          setPosition({latitude:location.coords.latitude, longitude:location.coords.longitude});
          updateUserPosition({latitude:location.coords.latitude, longitude:location.coords.longitude})
        } else {
            console.log('autorisation refusée')
        };
    };
    askPermissions();
}, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };
 
  const onSubmit = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShowDatePicker(!showDatePicker);
    setMode(currentMode);
  };
 
  const showDatePickerModal = () => {
    showMode('date');
  };
 
  const showPositionPickerModal = () => {
    setShowPositionPicker(!showPositionPicker);
    setPosition()
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  }

  // Arrondissement picker infos
  let displayListeArrondissements;
  displayListeArrondissements = arrondissements.map(q => {
    return <Picker.Item key={q.value} label={q.label} value={q.label} position={q.value}/>
  })

  
  const isActiveBadge = arrdt => {
    let badgeStyle = arrdt === arrondissement ? styles.badgeActiveStyle : styles.badgeInactiveStyle;
    return badgeStyle
  }

  const isActiveText = arrdt => {
    let textStyle = arrdt === arrondissement ? styles.badgeActiveText : styles.badgeInactiveText;
    return textStyle
  }

  const isCheck = arrdt => {
    let check = arrdt === arrondissement ? <AntDesign name="check" size={16} color="#FFFFFF" /> : '';
    return check
  }

  let displayArrondissementsBadges = arrondissements.map((e, i) => {
    return <Badge 
    key={i}
    containerStyle={{marginRight: 5, marginTop:5}} 
    value={
        <Text style={isActiveText(e)}>
                {isCheck(e)}
            {e.label}
        </Text>}
    badgeStyle={isActiveBadge(e)}
    onPress={() => {setArrondissement(e)}}
    />
  });


  let displayTitle;
  if(arrondissement) {
    displayTitle = arrondissement;
  } else {
    displayTitle = `Choisis ton arrondissement !`
  }

  // variable d'accueil et de display des pickers
  let displayPicker;
  //Date Position infos

  if(showPositionPicker) {
    displayPicker = <Overlay isVisible={visible} onBackdropPress={() => {toggleOverlay()}}>
    <Text style={styles.overlayText}>Choisis un arrondissement : </Text>
    <View style={{width:320, height:240, margin:8}}>
    {/* <Picker
      selectedValue={arrondissement}
      style={{width: 320}}
      onValueChange={(value) =>
        {setArrondissement(value)}
      }>
      {displayListeArrondissements}
    </Picker> */}
    {displayArrondissementsBadges}
    </View>
    <View style={styles.overlayBtns}>
      <Button
        title="Fermer"
        titleStyle={styles.btnTextDismiss}
        buttonStyle={styles.btnModalDismiss}
        onPress={() => {toggleOverlay(); showPositionPickerModal()}}/> 
    </View>
  </Overlay>
  }

  //Date picker infos
  if(showDatePicker) {
      displayPicker =  <Overlay isVisible={visible} onBackdropPress={() => {toggleOverlay();showDatePickerModal()}}>
      <Text style={styles.overlayText}>Alors si c'est pas ce soir, c'est quand ?</Text>
      <View style={{width:320, height:240}}>
      <DateTimePicker
                              testID="dateTimePicker"
                              locale="fr-FR"
                              value={date}
                              mode={mode}
                              display="default"
                              onChange={onChange}
                            />
      </View>
      <View style={styles.overlayBtns}>
        <Button
          title="Fermer"
          titleStyle={styles.btnTextDismiss}
          buttonStyle={styles.btnModalDismiss}
          onPress={() => {toggleOverlay();showDatePickerModal()}}/> 
      </View>
    </Overlay>

  }
  const options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};



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
            <ImageBackground source={require('../assets/images/pizzabackground.png')} style={styles.suggestionImage} imageStyle={{borderRadius:8}}>
              <Text style={styles.suggestionText}>Envie de pizza?</Text>
            </ImageBackground>
          </View>

          <Text style={styles.title}>On sort ?</Text>
          <Text style={styles.subtitle}>Choisis ton arrondissement :</Text>
          <View style={styles.containerBadges}>
              {displayArrondissementsBadges}
          </View>
          <View style={styles.pickerContainer}>
            <View>
              {/* <Button 
                  onPress={() => {showPositionPickerModal();toggleOverlay()}}
                  icon={          
                    <AntDesign name="enviromento" size={24} color="rgba(42, 43, 42, 0.4)" />
                } 
                  title={displayTitle}
                  titleStyle={styles.pickerText}
                  buttonStyle={styles.pickers} 
                  /> */}
              <Button 
                  onPress={() => {showDatePickerModal();toggleOverlay()}}
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
              onPress={() => console.log(date, position)}/>        
          </View>
          {displayPicker}
        </ImageBackground>
      </SafeAreaView>
      
    )
  };
};

function mapStateToProps(state) {
  return {
    userPosition:state.userPosition,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserPosition: function (position) {dispatch({type:'updateUserPosition', position:position})}
  }
};
  
export default connect(mapStateToProps, mapDispatchToProps) (HomeScreen)



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
      marginTop: 15
  },
  suggestionImageContainer: {
    alignSelf:"center",
    marginTop:32,
    borderRadius:8,
  },
  suggestionImage: {
    justifyContent:'flex-end',
    width:320,
    height:150, 
  },
  suggestionText: {
    color:'#FFFFFF',
    fontFamily: 'PTSans_700Bold',
    fontWeight:'bold',
    fontSize: 24,
    lineHeight:31,
    marginLeft: 24,
    marginBottom:16,
    alignSelf:'baseline',
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
      alignItems:"center",
      marginTop:16, 
      marginBottom: 1,
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
        height:25,
        borderRadius: 20
      },
    badgeInactiveStyle: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FF8367',
        height:25,
        borderRadius: 20,
        borderWidth:1
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
  },
  subtitle: {
      fontFamily: 'OpenSans_400Regular',
      fontSize: 16,
      fontWeight:'bold',
      marginLeft: 26,
      marginTop: 10,
      width:320,
  },
});  
  
  