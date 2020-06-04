import React, { useState } from 'react';
import { 
  Text, 
  View, 
  Platform, 
  StatusBar, 
  SafeAreaView, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground} from 'react-native';
import Header from './headerScreen.component';
import { Badge, Button } from 'react-native-elements';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ResultScreenDetails from './resultScreenDetails.component';
import { AntDesign } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import {
  useFonts,
  PTSans_400Regular,
  PTSans_700Bold,
  OpenSans_400Regular
} from '@expo-google-fonts/dev';

// fake data pour travailler l'intégration
const {suggestions} = require('../assets/datas/suggestions.json');
function ResultScreen({navigation}) {

  var currentlyOpened = 
  <View style={styles.containerOpen}>
    <AntDesign name="clockcircleo" size={16} color="#1DBC84" style={{marginRight:4}} />
    <Text style={styles.open}>
      Ouvert
    </Text>
  </View>
  var currentlyClosed = 
  <View style={styles.containerOpen}>
    <AntDesign name="clockcircleo" size={16} color="#DB331F" style={{marginRight:4}} />
    <Text style={styles.close}>
      Fermé
    </Text>
  </View>

  var rating = [];
  console.log(suggestions[0].rating)
  for(let i = 0; i < suggestions[0].rating; i++) {
    if(i < Math.round(suggestions[0].rating)) {
      rating.push(<AntDesign name="star" size={16} color="#FF8367" />)
    } else {
      rating.push(<AntDesign name="staro" size={16} color="#FF8367" />)
    }
  }

  let [fontsLoaded] = useFonts({
    PTSans_400Regular,
    PTSans_700Bold,
    OpenSans_400Regular,
  });
  if(!fontsLoaded) {
    return (
      <AppLoading />
    )
  } else {
    return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        //source={require('../assets/imagesTest/Atalante.png')}
        source={{uri: suggestions[0].photo}}
        style={styles.picture}
      >
      <Header />
      <Button
        icon={
          <AntDesign name="hearto" size={24} color="#FFFFFF" style={{marginTop:'auto'}}/>
        }
        containerStyle= {styles.likeButtonContainer}
        buttonStyle= {styles.likeButton}
      />
      <View style={styles.containerCard}>
      <Text style={styles.title}>{suggestions[0].nom}</Text>
        <View style={styles.containerRatingOpen}>
          <Text>
            {rating}
          </Text>
          {  
            suggestions[0].isOpen === true
            ? currentlyOpened
            : currentlyClosed
          }
        </View>

        <View style={styles.containerAdress}>
          <AntDesign name="enviromento" size={24} color="rgba(42, 43, 42, 0.4)" />
          <Text style={styles.adressText}>
            {suggestions[0].adresse}
          </Text>

        </View>

        <View style={styles.containerBadges}>
          <Badge 
            containerStyle={{marginRight: 8, marginTop:8}} 
            value={
              <Text style={styles.badgeText}>
                {suggestions[0].type}
              </Text>}
            badgeStyle={styles.badgeStyle}
          />

        </View>
      
        <Text style={styles.description}>
          Cet espace contemporain avec terrasse et vue sur le canal sert bières artisanales, planches et glaces.
        </Text>

      </View>
    </ImageBackground>
    <TouchableOpacity 
        style={styles.moreDetails}
        onPress={() => navigation.navigate('Details')}
    >
        <Text style={styles.moreDetailsText}>
          En savoir plus <AntDesign name="down" size={16} color="#FF8367" />
        </Text>
    </TouchableOpacity>
    </SafeAreaView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor:'#FFFFFF',
    height:'100%'
  },
  containerCard: {
    marginTop:128,
    backgroundColor:'#FFFFFF',
    borderTopLeftRadius: 32,
    display:'flex',
  },
  picture: {
    height:275
  },
  title: {
    fontFamily: 'PTSans_700Bold',
    fontSize: 32,
    fontWeight:'bold',
    marginLeft: 26,
    marginTop: 32
  },
  containerRatingOpen: {
    marginLeft: 26,
    marginTop: 8,
    display:'flex',
    flexDirection:'row'
  },
  containerOpen: {
    display:'flex',
    flexDirection:'row',
    marginLeft:20,
    alignItems:'center'
  },
  open: {
    color: '#1DBC84',
    fontFamily:'OpenSans_400Regular',
    fontSize: 14,
    fontWeight:'bold'
  },
  close:{
    color: '#DB331F',
    fontFamily:'OpenSans_400Regular',
    fontSize: 14,
    fontWeight:'bold'
  },
  containerAdress: {
    display:'flex', 
    flexDirection:'row', 
    alignItems:'center', 
    marginTop:8, 
    marginLeft:26
  },
  adressText: {
    marginLeft: 8,
    color: 'rgba(42, 43, 42, 0.4)',
    fontFamily:'OpenSans_400Regular',
    fontSize: 16
  },
  containerBadges: {
    display:'flex', 
    flexDirection:'row',
    flexWrap:'wrap', 
    alignItems:'center', 
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
  badgeStyle: {
    backgroundColor: 'rgba(255, 131, 103, 0.24)',
    borderColor: '#FF8367',
    height:28,
    borderRadius: 20
  },
  description: {
    marginLeft:26,
    fontFamily: 'OpenSans_400Regular',
    marginTop: 32,
    marginRight: 26,
  },
  likeButton: {
    width:44,
    height: 44,
    backgroundColor: '#FF8367',
    borderRadius: 40
  },
  likeButtonContainer: {
    alignSelf:'flex-end',
    marginRight: 16,
    marginTop: 16
  },
  moreDetails: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 15
  },
  moreDetailsText: {
    color:'#FF8367',
    fontSize: 14,
    fontWeight:'bold'
  }
});

var StackNavigator = createStackNavigator({
    Result: ResultScreen,
    Details: ResultScreenDetails
  },
  {
      headerMode:'none'
  });

const Navigation = createAppContainer(StackNavigator);

export default function result() {
    return(
        <Navigation/>
    );
}

/// À L'AIDE : COMMENT INTEGRER LE CONNECT REDUX ???


