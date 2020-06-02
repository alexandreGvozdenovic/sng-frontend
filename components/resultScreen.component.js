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
import { Badge, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import {
  useFonts,
  Bangers_400Regular,
  PTSans_400Regular,
  OpenSans_400Regular
} from '@expo-google-fonts/dev';

export default function App() {

  let [fontsLoaded] = useFonts({
    PTSans_400Regular,
    OpenSans_400Regular,
    Bangers_400Regular,
  });
  if(!fontsLoaded) {
    return (
      <AppLoading />
    )
  } else {
    return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerLogo}> Shake'n'Go </Text>
      <Image 
        source={require('./assets/imagesTest/Atalante.png')}
        style={styles.picture}
      />
      <Button
        icon={
          <AntDesign name="hearto" size={24} color="#FFFFFF" />
        }
        containerStyle= {styles.likeButtonContainer}
        buttonStyle= {styles.likeButton}
      />
      <View style={styles.containerCard}>
        <Text style={styles.title}>L'Atalante</Text>
        <Text style={styles.rating}>
          <AntDesign name="star" size={16} color="#FF8367" />
          <AntDesign name="star" size={16} color="#FF8367" />
          <AntDesign name="star" size={16} color="#FF8367" />
          <AntDesign name="star" size={16} color="#FF8367" />
          <AntDesign name="staro" size={16} color="#FF8367" />
        </Text>
        <View style={styles.containerAdress}>
          <AntDesign name="enviromento" size={24} color="rgba(42, 43, 42, 0.4)" />
          <Text style={styles.adressText}>
            26 Quai de la Marne, 75019 Paris
          </Text>
        </View>

        <View style={styles.containerBadges}>
          <Badge 
            containerStyle={{marginRight: 8, marginTop:8}} 
            value={
              <Text style={styles.badgeText}>
                Bar à bières
              </Text>}
            badgeStyle={styles.badgeStyle}
          />

          <Badge 
            containerStyle={{marginRight: 8, marginTop:8}} 
            value={
              <Text style={styles.badgeText}>
                Bar à bières
              </Text>}
            badgeStyle={styles.badgeStyle}
          />

          <Badge 
            containerStyle={{marginRight: 8, marginTop:8}} 
            value={
              <Text style={styles.badgeText}>
                Bar à bières
              </Text>}
            badgeStyle={styles.badgeStyle}
          />
          <Badge 
            containerStyle={{marginRight: 8, marginTop:8}} 
            value={
              <Text style={styles.badgeText}>
                Bar à bières
              </Text>}
            badgeStyle={styles.badgeStyle}
          />

        </View>
      
        <Text style={styles.description}>
          Cet espace contemporain avec terrasse et vue sur le canal sert bières artisanales, planches et glaces.
        </Text>

      </View>
      
      <TouchableOpacity style={{
        marginTop:'auto',
        marginBottom: 15,
        alignItems: 'center',      
      }}>
        <Text style={{
          color:'#FF8367',
          fontSize: 14,
          fontWeight:'bold'
          }}>
          En savoir plus <AntDesign name="down" size={16} color="#FF8367" />

        </Text>

      </TouchableOpacity>
    </SafeAreaView>
  );
  }
}
const styles = StyleSheet.create({
  headerLogo: {
    textAlign:'center',
    color: '#FF8367',
    fontFamily: 'PTSans_400Regular',
    fontStyle:'italic',
    fontWeight:'bold',
    fontSize: 24
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  containerCard: {
    position:'absolute',
    top:'37%',
    backgroundColor:'#FFFFFF',
    borderTopLeftRadius: 32,
    display:'flex',
    flexDirection:'column'
  },
  picture: {
    marginTop: 12,
    width:'100%'
  },
  title: {
    fontFamily: 'PTSans_400Regular',
    fontSize: 32,
    fontWeight:'bold',
    marginLeft: 26,
    marginTop: 32
  },
  rating: {
    marginLeft: 26,
    marginTop: 8
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
    flexGrow:1
  },
  likeButton: {
    width:44,
    height: 44,
    backgroundColor: '#FF8367',
    borderRadius: 40
  },
  likeButtonContainer: {
    position:'absolute',
    top: '12%',
    right: 16
  }
});
