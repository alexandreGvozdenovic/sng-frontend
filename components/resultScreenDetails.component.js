import React from 'react';
import { 
  Text, 
  View, 
  Platform, 
  StatusBar, 
  SafeAreaView, 
  Image, 
  TouchableOpacity, 
  StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { ListItem } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import {
  useFonts,
  PTSans_400Regular,
  OpenSans_400Regular
} from '@expo-google-fonts/dev';
import { ScrollView } from 'react-native-gesture-handler';

// fake data pour travailler l'intégration
const suggestions = require('../assets/datas/suggestions.json');

export default function resultScreenDetails() {

  let [fontsLoaded] = useFonts({
    PTSans_400Regular,
    OpenSans_400Regular,
  });

  const list = [
    {
      name: 'Jean-Pierre',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      rating: 4,
      comment: 'Une sélection de bière pointue. Des tapas d\'une rare qualité.'
    },
    {
      name: 'Chantal',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      rating: 5,
      comment: 'Un de mes spots favoris dans le 19ème pour boire une bonne bière !'
    },    {
      name: 'Jean-Pierre',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      rating: 4,
      comment: 'Une sélection de bière pointue. Des tapas d\'une rare qualité.'
    },
    {
      name: 'Chantal',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      rating: 5,
      comment: 'Un de mes spots favoris dans le 19ème pour boire une bonne bière !'
    }// more items
  ]

  let comments = list.map((l,i)=> {
      let rating = [];
      for(let j = 0 ; j < 5 ; j++){
          if(j < l.rating){
              rating.push(<AntDesign key={j} name="star" size={16} color="#FF8367" />)
          } else {
              rating.push(<AntDesign key={j} name="staro" size={16} color="#FF8367" />)
          }
      }
      return(
          <View style={styles.listItemContainer}>
            <ListItem
                key={i}
                containerStyle={styles.ListItem}
                titleStyle={styles.name}
                leftAvatar={{ source: { uri: l.avatar_url },containerStyle: styles.avatar}}
                title={l.name}
                subtitle={<Text>{rating}</Text>}
            />
            <Text style={styles.comment}>{l.comment}</Text>
          </View>
      )
  });

  if(!fontsLoaded) {
    return (
      <AppLoading />
    )
  } else {
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}> Comment on y va ? </Text>
        <View style={styles.mapContainer} >
            <MapView style={styles.mapStyle}
                initialRegion={{
                latitude: 48.890169,
                longitude: 2.382937,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            />
        </View>
        <Text style={styles.title}>Horaires</Text>
        <View style={styles.containerHoraires}>
          <View style={styles.containerJours}>
            <Text style={styles.textJours}>lundi</Text>
            <Text style={styles.textJours}>mardi</Text>
            <Text style={styles.textJoursToday}>mercredi</Text>
            <Text style={styles.textJours}>jeudi</Text>
            <Text style={styles.textJours}>vendredi</Text>
            <Text style={styles.textJours}>samedi</Text>
            <Text style={styles.textJours}>dimanche</Text>
          </View>

          <View>
            <Text style={styles.textHoraires}>Fermé</Text>
            <Text style={styles.textHoraires}>Fermé</Text>
            <Text style={styles.textHorairesToday}>16:00–20:00</Text>
            <Text style={styles.textHoraires}>16:00–20:30</Text>
            <Text style={styles.textHoraires}>16:00–20:30</Text>
            <Text style={styles.textHoraires}>12:00–20:30</Text>
            <Text style={styles.textHoraires}>12:00–20:00</Text>
          </View>
          
	
        </View>
        <Text style={styles.title}>Quelques avis</Text>
        {comments}
        </ScrollView>
    </SafeAreaView>
  );
  }
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    fontFamily: 'PTSans_400Regular',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 32,
    marginTop: 32
  },
  mapContainer: {
    marginTop:16,
    marginHorizontal: 32,
    height:120,
    borderRadius: 8,
    overflow:'hidden'
  },
  mapStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  },
  containerHoraires: {
    display:'flex',
    flexDirection:'row',
    marginLeft:32,
    marginTop: 16
  },
  containerJours: {
    marginRight:26
  },
  textJours: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textJoursToday: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color:'#FF8367'
  },
  textHoraires: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 16
  },
  textHorairesToday: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 16,
    fontWeight:'bold',
    color:'#FF8367'
  },
  listItemContainer: {
      marginHorizontal: 32,
      marginTop: 16,
      marginBottom: 15
  },
  ListItem: {
      paddingLeft:0,
      paddingRight: 16,
      paddingVertical:0
  },
  avatar: {
      width: 44,
      height: 44,
      borderRadius: 50,
  },
  name: {
    marginBottom:6,
    fontFamily: 'OpenSans_400Regular',
    fontSize: 16,
    fontWeight:'bold'
  },
  comment: {
      marginTop: 8,
      fontFamily: 'OpenSans_400Regular',
      fontSize: 16
  }
});
