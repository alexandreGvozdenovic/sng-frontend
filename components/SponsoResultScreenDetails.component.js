import React, { useState } from 'react';
import { 
  Text, 
  View, 
  SafeAreaView, 
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
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { useFocusEffect } from '@react-navigation/native';



const sponso = {
  placeId:1000001,
  type:'sponsorisé',
  nom:'Yo Mamma Pizza !',
  coords:{
    "lat": 48.859407,
    "lng": 2.3479707,
    },
  adresse:'18 Rue Saint-Denis, Paris',
  rating:5,
  isOpen:true,
  openingHours:[
    "lundi: 17:00 – 02:00",
    "mardi: 17:00 – 03:00",
    "mercredi: 17:00 – 04:00",
    "jeudi: 17:00 – 05:00",
    "vendredi: 17:00 – 05:00",
    "samedi: 13:00 – 05:00",
    "dimanche: 17:00 – 02:00",
  ],
  photo:'https://www.pariszigzag.fr/wp-content/uploads/2017/11/meilleur-pizza-monde-paris-zigzag-e1510331476865.jpg',
  reviews:[{
    auteur:'Jane Dough',
    avatar:'https://lh5.ggpht.com/-WAucISfBNng/AAAAAAAAAAI/AAAAAAAAAAA/USFWfso9ct0/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg',
    note:5,
    texte:`La réputation n'est pas usurpée. Yo Mamma Pizza ! est vraiment la meilleure pizzeria du monde`,
  },{
    auteur:'Mario Pepperoni',
    avatar:'https://lh5.ggpht.com/-fwzGjfQuG9M/AAAAAAAAAAI/AAAAAAAAAAA/NDnMpmTw5-c/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg',
    note:5,
    texte:`Des pizzas comme celles de Yo Mamma Pizza ! il n'y en a nulle part. Les italiens mêmes pourraient nous les envier`,
  },{
    auteur:'Zinedine Zidane',
    avatar:'https://lh4.ggpht.com/-QSAosyYmqBM/AAAAAAAAAAI/AAAAAAAAAAA/ulVtCs4M49o/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg',
    note:5,
    texte:`Si Materrazzi a pris un coup de boule c'est parce qu'il a osé dire du mal de Yo Mamma Pizza`,
  }],
}

function SponsoResultScreenDetails({navigation, shakeCount, setShakeCount}) {

  const [gestureName, setGestureName] = useState('none');

  useFocusEffect(
    React.useCallback(()=> {
      setShakeCount(12)
    }, [])
  );

  let [fontsLoaded] = useFonts({
    PTSans_400Regular,
    PTSans_700Bold,
    OpenSans_400Regular,
    OpenSans_700Bold
  });
  var today = new Date();

  let comments = sponso.reviews.map((l,i)=> {
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

  // Swipe
  function onSwipeDown(gestureState) {
    navigation.navigate('Sponso')
  };

  function onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setGestureName(gestureName);
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 40,
  };

  if(shakeCount === 13) {
    console.log('shakeCount = 13',shakeCount, 'on va la home')
    navigation.navigate('Home');
  };

  if(!fontsLoaded) {
    return (
      <AppLoading />
    )
  } else {
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView alwaysBounceVertical={false} >
      <GestureRecognizer
          onSwipe={(direction, state) => onSwipe(direction, state)}
          onSwipeDown={(state) => onSwipeDown(state)}
          config={config}>
          <Text style={styles.title}> Comment on y va ? </Text>
          <View style={styles.mapContainer} >
              <MapView style={styles.mapStyle}
                  initialRegion={{
                  latitude: sponso.coords.lat,
                  longitude: sponso.coords.lng,
                  latitudeDelta: 0.0015,
                  longitudeDelta: 0.0015,
                  }}
              >
                <Marker
                  coordinate={{latitude: sponso.coords.lat, longitude: sponso.coords.lng}}
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
                {sponso.openingHours[0].slice(0,5)}
              </Text>
              <Text style={
                  today.getDay() === 2
                  ? styles.textJoursToday
                  : styles.textJours
                }
              >
                {sponso.openingHours[1].slice(0,5)}
              </Text>
              <Text style={
                  today.getDay() === 3
                  ? styles.textJoursToday
                  : styles.textJours
                }
              >
                {sponso.openingHours[2].slice(0,8)}
              </Text>
              <Text style={
                  today.getDay() === 4
                  ? styles.textJoursToday
                  : styles.textJours
                }
              >
                {sponso.openingHours[3].slice(0,5)}
              </Text>
              <Text style={
                  today.getDay() === 5
                  ? styles.textJoursToday
                  : styles.textJours
                }
              >
                {sponso.openingHours[4].slice(0,8)}
              </Text>
              <Text style={
                  today.getDay() === 6
                  ? styles.textJoursToday
                  : styles.textJours
                }
              >
                {sponso.openingHours[5].slice(0,6)}
              </Text>
              <Text style={
                  today.getDay() === 0
                  ? styles.textJoursToday
                  : styles.textJours
                }
              >
                {sponso.openingHours[6].slice(0,8)}
              </Text>
            </View>

            <View>
              <Text style={
                  today.getDay() === 1
                  ? styles.textHorairesToday
                  : styles.textHoraires
                }
              >
                {sponso.openingHours[0].slice(7,sponso.openingHours[0].length)}
              </Text>
              <Text style={
                  today.getDay() === 2
                  ? styles.textHorairesToday
                  : styles.textHoraires
                }
              >
                {sponso.openingHours[1].slice(7,sponso.openingHours[1].length)}
              </Text>
              <Text style={
                  today.getDay() === 3
                  ? styles.textHorairesToday
                  : styles.textHoraires
                }
              >
                {sponso.openingHours[2].slice(10,sponso.openingHours[2].length)}
              </Text>
              <Text style={
                  today.getDay() === 4
                  ? styles.textHorairesToday
                  : styles.textHoraires
                }
              >
                {sponso.openingHours[3].slice(7,sponso.openingHours[3].length)}
              </Text>
              <Text style={
                  today.getDay() === 5
                  ? styles.textHorairesToday
                  : styles.textHoraires
                }
              >
                {sponso.openingHours[4].slice(10,sponso.openingHours[4].length)}
              </Text>
              <Text style={
                  today.getDay() === 6
                  ? styles.textHorairesToday
                  : styles.textHoraires
                }
              >
                {sponso.openingHours[5].slice(8,sponso.openingHours[5].length)}
              </Text>
              <Text style={
                  today.getDay() === 0
                  ? styles.textHorairesToday
                  : styles.textHoraires
                }
              >
                {sponso.openingHours[6].slice(10,sponso.openingHours[6].length)}
              </Text>
            </View>
            
    
          </View>
          <Text style={styles.title}>Quelques avis</Text>
          {comments}
        </GestureRecognizer>
      </ScrollView>
    </SafeAreaView>
  );
  }
}

function mapStateToProps(state) {
  return {
    shakeCount:state.shakeCount,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setShakeCount: function(value) {dispatch({type:'setShakeCount', value:value})},
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SponsoResultScreenDetails)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
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
      marginBottom: 15,
  },
  ListItem: {
      paddingLeft:0,
      paddingRight: 16,
      paddingVertical:0,
      backgroundColor:'#FCFCFC'
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
