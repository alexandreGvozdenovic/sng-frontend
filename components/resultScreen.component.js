import React from 'react';
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


// fake data pour travailler l'intégration
// const {suggestions} = require('../assets/datas/suggestions.json');

function ResultScreen({navigation, addToWishlist, suggestionCount, suggestionNumber, suggestions}) {

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

  if(suggestionCount > 3) {
    console.log('suggestionNumber',suggestionNumber)
    navigation.navigate('Filter')
  }

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
    if(i < Math.round(suggestions[suggestionNumber].rating)) {
      rating.push(<AntDesign key={i} name="star" size={16} color="#FF8367" />)
    } else {
      rating.push(<AntDesign key={i} name="staro" size={16} color="#FF8367" />)
    }
  }

  let [fontsLoaded] = useFonts({
    PTSans_400Regular,
    PTSans_700Bold,
    OpenSans_400Regular,
  });

  if(!fontsLoaded && suggestions.length>0) {
    return (
      <AppLoading />
    )
  } else {
    return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{uri: suggestions[suggestionNumber].photo}}
        style={styles.picture}
      >
      <Header />
      <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
        <Button
            onPress={()=>onShare(suggestions[suggestionNumber].nom, suggestions[suggestionNumber].adresse, suggestions[suggestionNumber].type)}
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
          onPress= {() => {console.log('add to wishlist ?');addToWishlist(suggestions[suggestionNumber])}}
        />
      </View>
      <View style={styles.containerCard}>
      <Text style={styles.title}>{suggestions[suggestionNumber].nom}</Text>
        <View style={styles.containerRatingOpen}>
          <Text>
            {rating}
          </Text>
          {  
            suggestions[suggestionNumber].isOpen === true
            ? currentlyOpened
            : currentlyClosed
          }
        </View>

        <View style={styles.containerAdress}>
          <AntDesign name="enviromento" size={24} color="rgba(42, 43, 42, 0.4)" />
          <Text style={styles.adressText}>
            {suggestions[suggestionNumber].adresse}
          </Text>

            </View>

        <View style={styles.containerBadges}>
          <Badge 
            containerStyle={{marginRight: 8, marginTop:8}} 
            value={
              <Text style={styles.badgeText}>
                {suggestions[suggestionNumber].type}
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

function mapStateToProps(state) {
  return {
    suggestionCount:state.suggestionCount, 
    suggestionNumber:state.suggestionNumber,
    suggestions:state.suggestions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishlist: function(place) {dispatch({type:'addToWishlist', place:place})},
    resetSuggestionNumber: function() {dispatch({type:'resetSuggestionNumber'})}
  }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor:'#F8F8F8',
    height:'100%'
  },
  containerCard: {
    marginTop:128,
    backgroundColor:'#F8F8F8',
=======
    backgroundColor: '#FFFFFF',
    height: '100%'
  },
  containerCard: {
    marginTop: 128,
    backgroundColor: '#FFFFFF',
>>>>>>> 8318e9ee1d19d0ae068858407c17e079f90d5b77
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
