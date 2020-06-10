import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useFonts, PTSans_400Regular, PTSans_700Bold, OpenSans_400Regular, OpenSans_700Bold} from '@expo-google-fonts/dev';
import { AppLoading } from 'expo';
import 'intl';
import 'intl/locale-data/jsonp/fr-FR';
import Header from './headerScreen.component';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'; 
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Badge } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const {arrondissements} = require('../scripts/arrondissements');
var backgroundTexture = require('../assets/images/Texture.png');

function HomeScreen({navigation, userPosition, updateUserPosition, updateUserType, updateUserRadius, resetSuggestionCount, resetShakeCount, suggestionCount, isAnim}) {

  const [position, setPosition] = useState();
  const [arrondissement, setArrondissement] = useState(0);

  const shakeImg = require('../assets/images/shaking-dog.gif');


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

  useFocusEffect(
    React.useCallback(()=> {
      resetSuggestionCount();
      resetShakeCount();
      updateUserType('');
      updateUserRadius(2000);
      setArrondissement(0);
    }, [])
  );

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

  const setUserPosition = coords => {
    if (coords === '') {
      updateUserPosition(position);
    } else {
      updateUserPosition(coords);
    }
  }

  let displayArrondissementsBadges = arrondissements.map((arrdt, i) => {
    return <Badge 
    key={i}
    containerStyle={{marginRight: 8, marginTop:8}} 
    value={
        <Text style={isActiveText(arrdt.id)}>
                {isCheck(arrdt.id)}
            {arrdt.label}
        </Text>}
    badgeStyle={isActiveBadge(arrdt.id)}
    onPress={() => {setArrondissement(arrdt.id); setUserPosition(arrdt.value)}}
    />
  })

  let screenDisplay;
  if(isAnim) {
    screenDisplay = <Image source={shakeImg} style={{height:'100%', width:'100%'}}/>
  } else {
    screenDisplay;
  };

  if(suggestionCount===1) {
    navigation.navigate('Result')
  }

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
          {screenDisplay}
          <TouchableOpacity style={styles.suggestionImageContainer} onPress={() => {navigation.navigate('Sponso')}}>
            <ImageBackground source={require('../assets/images/pizzabackground.png')} style={styles.suggestionImage} imageStyle={{borderRadius:8}}>
              <Text style={styles.suggestionText}>Envie de pizza?</Text>
            </ImageBackground>
          </TouchableOpacity>
          <Text style={styles.title}>On sort ?</Text>
          <Text style={styles.subTitle}>Tout près de toi, ou n'importe où dans Paris</Text>
          <View style={styles.containerBadges}>
            {displayArrondissementsBadges}
          </View>
        </ImageBackground>
      </SafeAreaView>
      
    )
  };
};

function mapStateToProps(state) {
  return {
    userPosition:state.userPosition, 
    suggestionCount:state.suggestionCount,
    isAnim:state.isAnim
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserPosition: function (position) {dispatch({type:'updateUserPosition', position:position})},
    updateUserType: function(userType) {dispatch({type:'updateUserType', userType:userType})},
    updateUserRadius: function(radius) {dispatch({type:'expandRadius', radius:radius})},
    resetSuggestionCount: function() {dispatch({type:'resetSuggestionCount'})},
    resetShakeCount: function() {dispatch({type:'resetShakeCount'})},
    launchAnim: function(status) {dispatch({type:'launchAnim', status:status})}
  }
};
  
export default connect(mapStateToProps, mapDispatchToProps) (HomeScreen)




const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  subTitle:{
    color: '#2A2B2A',
    fontFamily:'OpenSans_400Regular',
    fontSize: 14,
    marginTop:8,
    marginLeft: 26,
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
  containerBadges: {
      display:'flex', 
      flexDirection:'row',
      flexWrap:'wrap', 
      marginTop:8, 
      marginLeft:26,
      marginEnd: 26,
    },
  badgeActiveStyle: {
    backgroundColor: 'rgba(255, 131, 103, 1)',
    borderColor: '#FF8367',
    height:28,
    borderRadius: 20,
  },
  badgeInactiveStyle: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF8367',
    height:28,
    borderRadius: 20,
  },
  badgeActiveText: {
    fontSize: 14,
    lineHeight:22,
    fontFamily:'OpenSans_400Regular',
    color:'#FFFFFF', 
    paddingHorizontal: 16, 
    paddingVertical: 3
  },
  badgeInactiveText: {
    fontSize: 14,
    lineHeight:22,
    fontFamily:'OpenSans_400Regular',
    color:'#FF8367',
    paddingHorizontal: 16, 
    paddingVertical: 3 
  },
  background: {
    height:'100%'
  }
});  
  
  