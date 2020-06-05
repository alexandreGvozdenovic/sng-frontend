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
import { connect } from 'react-redux';


var backgroundTexture = require('../assets/images/Texture.png');

function FilterScreen({updateUserType}) {

  const [selected, setSelected] = useState('')

  let typeList = ['Bar', 'Restaurant', 'Supermarket', 'Spectacle'];

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
    onPress={() => {updateUserType(t);setSelected(t)}}
    />
  })

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
              {types}
            </View>
            <View style={styles.btnContainer}>
                <Button
                    title="Montre-moi les résultats"
                    titleStyle={styles.btnText}
                    buttonStyle={styles.btnPrimary}
                    onPress={() => updateUserType(selected)}
                />
            </View>
        </ImageBackground>
      </SafeAreaView>
      
    )
  };
};

function mapStateToProps(state) {
  return {}
};

function mapDispatchToProps(dispatch) {
  return {
    updateUserType: function (userType) {dispatch({type:'updateUserType', userType:userType})}
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
