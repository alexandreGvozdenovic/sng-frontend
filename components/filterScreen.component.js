import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import { Button, Badge, Divider } from 'react-native-elements';
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
import { connect } from 'react-redux';

var backgroundTexture = require('../assets/images/Texture.png');
const shakeImg = require('../assets/images/shaking-dog.gif');

function FilterScreen({navigation, suggestionCount, updateUserType, resetSuggestionCount, resetSuggestionNumber, shakeCount, userType, userRadius, isAnim}) {

  const [selected, setSelected] = useState('');
  const [stillDisplay, setStillDisplay] = useState(true);

  let typeList = ['bar', 'restaurant', 'supermarket'];

  useEffect(()=>{
    console.log('je suis dans le filter')
    resetSuggestionCount();
    resetSuggestionNumber();
    return () => {
      resetSuggestionNumber();
      setStillDisplay(false);
    }
  },[]);

  let screenDisplay;
  if(isAnim) {
    console.log(isAnim, 'on envoie le film')
    screenDisplay = <Image source={shakeImg} style={{height:'90%', width:'100%'}}/>
  } else {
    console.log(isAnim, 'on arrête le film')
    screenDisplay;
  };

  const isActiveBadge = type => {
    let badgeStyle = type === selected ? styles.badgeActiveStyle : styles.badgeInactiveStyle;
    return badgeStyle
  }

  const isActiveText = type => {
    let textStyle = type === selected ? styles.badgeActiveText : styles.badgeInactiveText;
    return textStyle
  }

  const isCheck = type => {
    let check = type === selected ? <AntDesign name="check" size={16} color="#FFFFFF" /> : '';
    return check
  }

  let types = typeList.map((t, i) => {
    return <Badge 
    key={i}
    containerStyle={{marginRight: 8, marginTop:8}} 
    value={
        <Text style={isActiveText(t)}>
                {isCheck(t)}
            {t}
        </Text>}
    badgeStyle={isActiveBadge(t)}
    onPress={() => {setStillDisplay(true);updateUserType(t);setSelected(t)}}
    />
  })

  if(suggestionCount===1) {
    navigation.navigate('Result')
  }

  let messageDisplay = shakeCount < 5 ? 
      <Text style={styles.title}>Un peu moins de hasard ?
      {/* <Text style={styles.subtitle}>Commence par choisir parmi ces propositions :</Text> */}
    </Text> : shakeCount < 9 ?
      <Text style={styles.title}>Es-tu sûr•e de vouloir sortir ?
      {/* <Text style={styles.subtitle}>Tu peux toujours choisir parmi ces propositions :</Text> */}
    </Text> :
    <View>
      <Text style={styles.title}>Choisir c'est renoncer !</Text>
      <Text style={styles.subtitle}>Pour le moment tu n'es pas prêt à choisir. Quittes l'application et essayes à nouveau dans 5 minutes...</Text>
    </View>;

  let typeInvite;
  if(shakeCount < 9 && userType ==='' || stillDisplay) {
    typeInvite = 
      <View>
        <Text style={styles.subtitle}>Commence par choisir parmi ces propositions :</Text>
        <View style={styles.containerBadges}>
            {types}
        </View>
      </View>
  }

  let radiusInvite;
  if(!userRadius && shakeCount < 9) {
    radiusInvite = 
      <View>
        <Text style={styles.subtitle}>Tu peux décider d'élargir tes horizons :</Text>
        <View style={styles.btnContainer}>
          <Button
              title="Je suis prêt•e à aller plus loin"
              titleStyle={styles.btnText}
              buttonStyle={styles.btnPrimary}
              onPress={() => updateUserType(selected)}
          />
        </View>
      </View>
  }

  let separateur;
  if (shakeCount < 10 && userType === '' && !userRadius) {
    separateur = 
    <View style={{alignItems:"center"}}>
      <Divider style={{width:320, height: 1.2, backgroundColor:'#FF8367', marginTop:16}}/>
    </View>
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
        {screenDisplay}
        <ImageBackground source={backgroundTexture} style={styles.container}>
        <Header/>
          {messageDisplay}
          {typeInvite}
          {separateur}
          {radiusInvite}
          {/* <View style={styles.btnContainer}>
            <Button
                title="Montre-moi les résultats"
                titleStyle={styles.btnText}
                buttonStyle={styles.btnPrimary}
                onPress={() => updateUserType(selected)}
            />
          </View> */}
        </ImageBackground>
      </SafeAreaView>
      
    )
  };
};

function mapStateToProps(state) {
  return {
    suggestionCount:state.suggestionCount, 
    shakeCount:state.shakeCount, 
    userType:state.userType, 
    userRadius:state.userRadius,
    isAnim:state.isAnim
  }
};

function mapDispatchToProps(dispatch) {
  return {
    updateUserType: function (userType) {dispatch({type:'updateUserType', userType:userType})},
    resetSuggestionCount: function() {dispatch({type:'resetSuggestionCount'})},
    resetSuggestionNumber: function() {dispatch({type:'resetSuggestionNumber'})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterScreen)


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
      // flex:1,
      alignItems:'center',
      marginTop:24,
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
