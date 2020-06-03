import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { Badge, Button, Card, Icon } from 'react-native-elements';
import {
    useFonts,
    PTSans_400Regular,
    OpenSans_400Regular
  } from '@expo-google-fonts/dev';
import { AppLoading } from 'expo';
import { AntDesign } from '@expo/vector-icons';



var backgroundTexture = require('../assets/images/Texture.png')

function HistoryScreen() {
    let [fontsLoaded] = useFonts({
        PTSans_400Regular,
        OpenSans_400Regular,
      });
    if(!fontsLoaded) {
        return (
            <AppLoading />
        )
    } else {
        return (
            <ImageBackground source={backgroundTexture} style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.headerBackground}>
                        <Text style={styles.headerLogo}> Shake'n'Go </Text>
                    </View>
                    <ScrollView>
                        <Text style={styles.title}>Ma wishlist</Text>
                        <View style={styles.containerBadges}>
                            <Badge 
                                containerStyle={{marginRight: 8, marginTop:8}} 
                                value={
                                <Text style={styles.badgeText}>
                                    Bar
                                </Text>}
                                badgeStyle={styles.badgeActiveStyle}
                            />

                            <Badge 
                                containerStyle={{marginRight: 8, marginTop:8}} 
                                value={
                                <Text style={styles.badgeText}>
                                    Restaurant
                                </Text>}
                                badgeStyle={styles.badgeInactiveStyle}
                            />
                        </View>
                        <View>
                            <Card
                                containerStyle={{borderRadius:8}}
                                image={require('../assets/imagesTest/Atalante.png')}
                                imageWrapperStyle={{marginTop:16,marginLeft:16, marginRight:16}}
                                imageStyle={{borderRadius:8}}>
                                {/* <Image source={require('../assets/imagesTest/Atalante.png')}></Image> */}
                                <Text style={styles.cardTitle}>Paname Brewing Company</Text>
                                <Text style={styles.rating}>
                                    <AntDesign name="star" size={16} color="#FF8367" />
                                    <AntDesign name="star" size={16} color="#FF8367" />
                                    <AntDesign name="star" size={16} color="#FF8367" />
                                    <AntDesign name="star" size={16} color="#FF8367" />
                                    <AntDesign name="staro" size={16} color="#FF8367" />
                                </Text>
                                <Text style={styles.text}>
                                Bar à l'esprit loft, habillé de matériaux bruts, servant un menu street food et des bières artisanales.</Text>
                            </Card>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>    
        )
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent:'center',
    //   alignItems:'center',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
        fontFamily: 'PTSans_400Regular',
        fontSize: 32,
        fontWeight:'bold',
        marginLeft: 26,
        marginTop: 32
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
    cardTitle: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: 16,
        fontWeight:'bold',
        marginBottom:8
    },
    text: {
        color: '#2A2B2A',
        fontFamily:'OpenSans_400Regular',
        fontSize: 14,
        marginTop:8

    },
  });

export default HistoryScreen