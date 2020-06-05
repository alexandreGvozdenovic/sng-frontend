import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, ImageBackground, Image, Platform, StatusBar} from 'react-native';
import { Badge, Button, Card, Icon } from 'react-native-elements';
import {
    useFonts,
    PTSans_400Regular,
    PTSans_700Bold,
    OpenSans_400Regular,
    OpenSans_700Bold,
  } from '@expo-google-fonts/dev';
import Header from './headerScreen.component';
import { AppLoading } from 'expo';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';

// fake data pour travailler l'intégration
// const {suggestions} = require('../assets/datas/suggestions.json');

var backgroundTexture = require('../assets/images/Texture.png')

function BookMarksScreen({userWishlist}) {

    const [filter, setFilter] = useState('Tout');
    const [isFiltered, setIsFiltered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    
    let filterList = ['Tout']
    userWishlist.map(e => {
        const type = e.type;
        if (!filterList.includes(type)) {
            filterList.push(type)
        }
    })
    
    const isActiveFunct = type => {
        let badgeStyle = type === filter || type === '' ? styles.badgeActiveStyle : styles.badgeInactiveStyle;
        return badgeStyle
    }
    const filters = []
    filterList.map((e, i) => {
        filters.push(<Badge 
            containerStyle={{marginRight: 8, marginTop:8}} 
            value={
        <Text style={styles.badgeText}>
            {e}
        </Text>}
        badgeStyle={isActiveFunct(e)}
        onPress={()=> {setFilter(e);setIsFiltered(true)}}
        />)
    })

    let filteredWishlist = []
    function filterByCat(categorie) {
        if(isFiltered && filter !== 'Tout') {
            filteredWishlist = userWishlist.filter((e => e.type === categorie))
        }
        else {
            filteredWishlist = userWishlist;
        }
    }
    
    filterByCat(filter)

    let wishlist = [];
    wishlist = filteredWishlist.map((p,i) => {
        var rating = []
        for (var i = 0; i<5; i++){
            if(i<Math.floor(p.rating)) {
                rating.push(<AntDesign key={i+''+p.place_id} name="star" size={16} color="#FF8367" />)
            } else {
                rating.push(<AntDesign key={i+''+p.place_id} name="staro" size={16} color="#FF8367" />)
            }
        };
        return <Card
            key={p.place_id+''+i}
            containerStyle={styles.cardContainer}>
            <Image source={{uri:p.photo}} style={styles.cardImage}></Image>
            <Text style={styles.cardTitle}>{p.nom}</Text>
            <Text style={styles.rating}>
                {rating}
            </Text>
            <Text style={styles.text}>
                {p.reviews[0].texte}
            </Text>
        </Card>
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
                    <ImageBackground source={backgroundTexture} style={styles.background}>
                    <Header/>
                    <ScrollView>
                        <Text style={styles.title}>Ma wishlist</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.containerBadges}>
                            {filters}
                        </ScrollView>
                        <View>
                            {wishlist}
                        </View>
                    </ScrollView>
                </ImageBackground>    
            </SafeAreaView>
        )
    }
};

function mapStateToProps(state) {
    return{userWishlist:state.wishlist}
}

export default connect(mapStateToProps, null)(BookMarksScreen)

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
        fontWeight:'bold',
        fontSize: 24
      },
    title: {
        fontFamily: 'PTSans_700Bold',
        fontSize: 32,
        fontWeight:'bold',
        marginLeft: 26,
        marginTop: 32
    },
    containerBadges: {
        display:'flex', 
        flexDirection:'row',
        flexWrap:'wrap', 
        // alignItems:'center', 
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
    badgeActiveStyle: {
        backgroundColor: 'rgba(255, 131, 103, 0.24)',
        borderColor: '#FF8367',
        height:28,
        borderRadius: 20
      },
    badgeInactiveStyle: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FF8367',
        height:28,
        borderRadius: 20
      },
    cardContainer: {
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
    cardTitle: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 16,
        lineHeight:22,
        fontWeight:'bold',
        marginBottom:8
    },
    cardImage: {
        width:'auto', 
        height:150, 
        borderRadius:8, 
        marginBottom:8
    },
    text: {
        color: '#2A2B2A',
        fontFamily:'OpenSans_400Regular',
        fontSize: 14,
        marginTop:8

    },
    background: {
        height:'100%'
      }
  });