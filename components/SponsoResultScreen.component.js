import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Share
} from 'react-native';
import Header from './headerScreen.component';
import { Badge, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import {
  useFonts,
  PTSans_400Regular,
  PTSans_700Bold,
  OpenSans_400Regular
} from '@expo-google-fonts/dev';
//redux
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
  photo:'https://www.pariszigzag.fr/wp-content/uploads/2017/11/meilleur-pizza-monde-paris-zigzag-e1510331476865.jpg'
  // reviews:[{
  //   auteur:'',
  //   avatar:resultatDetail.result.reviews[0].profile_photo_url,
  //   note:resultatDetail.result.reviews[0].rating,
  //   texte:resultatDetail.result.reviews[0].text,
  // },{
  //   auteur:capitalize(resultatDetail.result.reviews[1].author_name),
  //   avatar:resultatDetail.result.reviews[1].profile_photo_url,
  //   note:resultatDetail.result.reviews[1].rating,
  //   texte:resultatDetail.result.reviews[1].text,
  // },{
  //   auteur:capitalize(resultatDetail.result.reviews[2].author_name),
  //   avatar:resultatDetail.result.reviews[2].profile_photo_url,
  //   note:resultatDetail.result.reviews[2].rating,
  //   texte:resultatDetail.result.reviews[2].text,
  // }],
}

function SponsoResultScreen({navigation, addToWishlist, shakeCount, setShakeCount}) {

  const [gestureName, setGestureName] = useState('none');

  useFocusEffect(
    React.useCallback(()=> {
      setShakeCount(12)
    }, [])
  );

  // Sharing logic  {onShare}
  const onShare = async (nom, adresse, type) => {
    try {
      const result = await Share.share({
        message:
          `Tiens, j'ai trouvé ce ${type} sur Shake'n'Go : ${nom}. C'est au ${adresse}. Ça te tente?`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
  }
};

  var currentlyOpened =
    <View style={styles.containerOpen}>
      <AntDesign name="clockcircleo" size={16} color="#1DBC84" style={{ marginRight: 4 }} />
      <Text style={styles.open}>
        Ouvert
    </Text>
    </View>
  var currentlyClosed =
    <View style={styles.containerOpen}>
      <AntDesign name="clockcircleo" size={16} color="#DB331F" style={{ marginRight: 4 }} />
      <Text style={styles.close}>
        Fermé
    </Text>
    </View>

  var rating = [];
  for(let i = 0; i < 5; i++) {
    if(i < Math.round(sponso.rating)) {
      rating.push(<AntDesign key={i} name="star" size={16} color="#FF8367" />)
    } else {
      rating.push(<AntDesign key={i} name="staro" size={16} color="#FF8367" />)
    }
  }

  // Swipe
  function onSwipeUp(gestureState) {
    navigation.navigate('SponsoDetails')
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
        source={{uri: sponso.photo}}
        style={styles.picture}
      >
        <Header />
        <GestureRecognizer
          onSwipe={(direction, state) => onSwipe(direction, state)}
          onSwipeUp={(state) => onSwipeUp(state)}
          config={config}
          >
          <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
            <Button
                onPress={()=>onShare(sponso.nom, sponso.adresse, sponso.type)}
                    icon={
                      <AntDesign name="sharealt" size={24} color="#FFFFFF" style={{ marginTop: 'auto' }} />
                    }
                    containerStyle={styles.likeButtonContainer}
                    buttonStyle={styles.likeButton}
                  />
            <Button
              icon={
                <AntDesign name="hearto" size={24} color="#FFFFFF" style={{marginTop:'auto'}}/>
              }
              containerStyle= {styles.likeButtonContainer}
              buttonStyle= {styles.likeButton}
              onPress= {() => {console.log('add to wishlist ?');addToWishlist(sponso)}}
            />
          </View>
          <View style={styles.containerCard}>
          <Text style={styles.title}>{sponso.nom}</Text>
            <View style={styles.containerRatingOpen}>
              <Text>
                {rating}
              </Text>
              {  
                sponso.isOpen === true
                ? currentlyOpened
                : currentlyClosed
              }
            </View>

            <View style={styles.containerAdress}>
              <AntDesign name="enviromento" size={24} color="rgba(42, 43, 42, 0.4)" />
              <Text style={styles.adressText}>
                {sponso.adresse}
              </Text>

        </View>

            <View style={styles.containerBadges}>
              <Badge 
                containerStyle={{marginRight: 8, marginTop:8}} 
                value={
                  <Text style={styles.badgeText}>
                    {sponso.type}
                  </Text>}
                badgeStyle={styles.badgeStyle}
              />

                </View>

                <Text style={styles.description}>
                Pour déguster la meilleure pizza du monde, inutile de se rendre en Italie. Il suffit de faire un détour par Yo Mamma Pizza !, où Giuseppe Cutraro, alias Peppe, vient d'ouvrir sa pizzeria..
                </Text>

            </View>
        </GestureRecognizer>
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

function mapStateToProps(state) {
  return {
    shakeCount:state.shakeCount
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishlist: function(place) {dispatch({type:'addToWishlist', place:place})},
    setShakeCount: function(value) {dispatch({type:'setShakeCount', value:value})},
  }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(SponsoResultScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    height: '100%'
  },
  containerCard: {
    marginTop: 128,
    backgroundColor: '#FCFCFC',
    borderTopLeftRadius: 32,
    display: 'flex',
  },
  picture: {
    height: 275
  },
  title: {
    fontFamily: 'PTSans_700Bold',
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 26,
    marginTop: 32
  },
  containerRatingOpen: {
    marginLeft: 26,
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row'
  },
  containerOpen: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center'
  },
  open: {
    color: '#1DBC84',
    fontFamily: 'OpenSans_400Regular',
    fontSize: 14,
    fontWeight: 'bold'
  },
  close: {
    color: '#DB331F',
    fontFamily: 'OpenSans_400Regular',
    fontSize: 14,
    fontWeight: 'bold'
  },
  containerAdress: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 26
  },
  adressText: {
    marginLeft: 8,
    color: 'rgba(42, 43, 42, 0.4)',
    fontFamily: 'OpenSans_400Regular',
    fontSize: 16
  },
  containerBadges: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 26,
    marginEnd: 26,
  },
  badgeText: {
    fontSize: 16,
    fontFamily: 'OpenSans_400Regular',
    color: '#FF8367',
    paddingHorizontal: 16,
    paddingVertical: 3
  },
  badgeStyle: {
    backgroundColor: 'rgba(255, 131, 103, 0.24)',
    borderColor: '#FF8367',
    height: 28,
    borderRadius: 20
  },
  description: {
    marginLeft: 26,
    fontFamily: 'OpenSans_400Regular',
    marginTop: 32,
    marginRight: 26,
  },
  likeButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FF8367',
    borderRadius: 40
  },
  likeButtonContainer: {
    alignSelf: 'flex-end',
    marginRight: 16,
    marginTop: 16
  },
  moreDetails: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 24
  },
  moreDetailsText: {
    color: '#FF8367',
    fontSize: 14,
    fontWeight: 'bold'
  }
});
