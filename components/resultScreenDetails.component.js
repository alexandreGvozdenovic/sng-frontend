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
import MapView, { Marker } from 'react-native-maps';
import { ListItem } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import {
  useFonts,
  PTSans_400Regular,
  PTSans_700Bold,
  OpenSans_400Regular,
  OpenSans_700Bold
} from '@expo-google-fonts/dev';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

// fake data pour travailler l'intégration
const {suggestions} = require('../assets/datas/suggestions.json');

function resultScreenDetails({navigation, suggestionNumber}) {

  let [fontsLoaded] = useFonts({
    PTSans_400Regular,
    PTSans_700Bold,
    OpenSans_400Regular,
    OpenSans_700Bold
  });
  var today = new Date();
  console.log(today.getDay());

  let comments = suggestions[suggestionNumber].reviews.map((l,i)=> {
      let rating = [];
      for(let j = 0 ; j < 5 ; j++){
          if(j < Math.round(l.note)){
              rating.push(<AntDesign key={i+j} name="star" size={16} color="#FF8367" />)
          } else {
              rating.push(<AntDesign key={i+j} name="staro" size={16} color="#FF8367" />)
          }
      }
      return(
          <View style={styles.listItemContainer}>
            <ListItem
                key={i}
                containerStyle={styles.ListItem}
                titleStyle={styles.name}
                leftAvatar={{ source: { uri: l.avatar },containerStyle: styles.avatar}}
                title={l.auteur}
                subtitle={<Text>{rating}</Text>}
            />
            <Text style={styles.comment}>{l.texte}</Text>
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
                latitude: suggestions[suggestionNumber].coords.lat,
                longitude: suggestions[suggestionNumber].coords.lng,
                latitudeDelta: 0.0015,
                longitudeDelta: 0.0015,
                }}
            >
              <Marker
                coordinate={{latitude: suggestions[suggestionNumber].coords.lat, longitude: suggestions[suggestionNumber].coords.lng}}
              />
            </MapView>
        </View>
        <Text style={styles.title}>Horaires</Text>
        <View style={styles.containerHoraires}>
          <View style={styles.containerJours}>
            <Text style={
              today.getDay() === 1
              ? styles.textJoursToday
              : styles.textJours
            }
            >
              {suggestions[suggestionNumber].openingHours[0].slice(0,5)}
            </Text>
            <Text style={
                today.getDay() === 2
                ? styles.textJoursToday
                : styles.textJours
              }
            >
              {suggestions[suggestionNumber].openingHours[1].slice(0,5)}
            </Text>
            <Text style={
                today.getDay() === 3
                ? styles.textJoursToday
                : styles.textJours
              }
            >
              {suggestions[suggestionNumber].openingHours[2].slice(0,8)}
            </Text>
            <Text style={
                today.getDay() === 4
                ? styles.textJoursToday
                : styles.textJours
              }
            >
              {suggestions[suggestionNumber].openingHours[3].slice(0,5)}
            </Text>
            <Text style={
                today.getDay() === 5
                ? styles.textJoursToday
                : styles.textJours
              }
            >
              {suggestions[suggestionNumber].openingHours[4].slice(0,8)}
            </Text>
            <Text style={
                today.getDay() === 6
                ? styles.textJoursToday
                : styles.textJours
              }
            >
              {suggestions[suggestionNumber].openingHours[5].slice(0,6)}
            </Text>
            <Text style={
                today.getDay() === 0
                ? styles.textJoursToday
                : styles.textJours
              }
            >
              {suggestions[suggestionNumber].openingHours[6].slice(0,8)}
            </Text>
          </View>

          <View>
            <Text style={
                today.getDay() === 1
                ? styles.textHorairesToday
                : styles.textHoraires
              }
            >
              {suggestions[suggestionNumber].openingHours[0].slice(7,suggestions[suggestionNumber].openingHours[0].length)}
            </Text>
            <Text style={
                today.getDay() === 2
                ? styles.textHorairesToday
                : styles.textHoraires
              }
            >
              {suggestions[suggestionNumber].openingHours[1].slice(7,suggestions[suggestionNumber].openingHours[1].length)}
            </Text>
            <Text style={
                today.getDay() === 3
                ? styles.textHorairesToday
                : styles.textHoraires
              }
            >
              {suggestions[suggestionNumber].openingHours[2].slice(10,suggestions[suggestionNumber].openingHours[2].length)}
            </Text>
            <Text style={
                today.getDay() === 4
                ? styles.textHorairesToday
                : styles.textHoraires
              }
            >
              {suggestions[suggestionNumber].openingHours[3].slice(7,suggestions[suggestionNumber].openingHours[3].length)}
            </Text>
            <Text style={
                today.getDay() === 5
                ? styles.textHorairesToday
                : styles.textHoraires
              }
            >
              {suggestions[suggestionNumber].openingHours[4].slice(10,suggestions[suggestionNumber].openingHours[4].length)}
            </Text>
            <Text style={
                today.getDay() === 6
                ? styles.textHorairesToday
                : styles.textHoraires
              }
            >
              {suggestions[suggestionNumber].openingHours[5].slice(8,suggestions[suggestionNumber].openingHours[5].length)}
            </Text>
            <Text style={
                today.getDay() === 0
                ? styles.textHorairesToday
                : styles.textHoraires
              }
            >
              {suggestions[suggestionNumber].openingHours[6].slice(10,suggestions[suggestionNumber].openingHours[6].length)}
            </Text>
          </View>
          
	
        </View>
        <Text style={styles.title}>Quelques avis</Text>
        {comments}
        </ScrollView>
    </SafeAreaView>
  );
  }
}

function mapStateToProps(state) {
  return {suggestionNumber:state.suggestionNumber}
}

export default connect(mapStateToProps, null)(resultScreenDetails)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    fontFamily: 'PTSans_700Bold',
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
    fontFamily:'OpenSans_700Bold',
    marginBottom:6
  },
  comment: {
    fontFamily:'OpenSans_400Regular',
    marginTop: 8
  }
});
