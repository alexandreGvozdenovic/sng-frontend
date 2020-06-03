import React from 'react';
import { View, Text, StatusBar, Platform, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const styles = StyleSheet.create({
    header:
    {
        
        left: "0%",
        right: "0%",
        top: "0%",
        bottom: "0%",
        maxHeight: "60px",
        
        // /* Cloud */
        
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 8px 16px rgba(42, 43, 42, 0.08)",
    },
    
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#ffffff',
        
    },
    
    h1: { 
        textAlign: "center",
        fontFamily: "PT Sans",
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: "31px",
        paddingTop: "3%",
        
        
        /* identical to box height */
        
        
        /* Salmon */
        
        color: "#FF8367",
        
        
        
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
    
    content: {
        marginTop: "112px",
        marginLeft: "auto",
        marginRight: "auto",
        width: "80%",
    },
    
    
    imageDeFont:{
        backgroundImage: 'url("image/Texture.png")',
    },
    
    
    btnPrimary: {
        
        /* Salmon */
        
        backgroundColor: "#FF8367 !important",
        borderColor: "#FF8367 !important",
        marginTop: "32px",
        
    },
    
    /* H2 */
    
    title : {
        
        fontFamily: "PT Sans",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "32px",
        lineHeight: "41px",
        marginTop:"32px",
        marginBottom: "32px",
        
    },

    /* Text */
    
    text : {
        
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        fonWize: "16px",
        lineHeight: "22px",

color: "#273043",
        
    },
});  

function FilterScreen() {
    
    return (
        
        <View style={styles.imageDeFont}>
        <View style={styles.container}>
        <header style={styles.header}> 
        <h1>style={styles.h1} Shake'n'Go </h1>
        
        </header>
        
        
        <h2 style={styles.title}> Un peu moins de hasard ? </h2>
        <text style={styles.text}> Commence par choisir parmi ces propositions: </text>
        
        <Badge 
        containerStyle={{marginRight: 8, marginTop:8}} 
        value={
            <Text style={styles.badgeText}>
            Bar
            </Text>}
            badgeStyle={styles.badgeStyle}
            />
            
            <Badge 
            containerStyle={{marginRight: 8, marginTop:8}} 
            value={
                <Text style={styles.badgeText}>
                Restaurants
                </Text>}
                badgeStyle={styles.badgeStyle}
                />
                
                <Badge 
                containerStyle={{marginRight: 8, marginTop:8}} 
                value={
                    <Text style={styles.badgeText}>
                    Club
                    </Text>}
                    badgeStyle={styles.badgeStyle}
                    />
                    
                    <Badge 
                    containerStyle={{marginRight: 8, marginTop:8}} 
                    value={
                        <Text style={styles.badgeText}>
                        Spectacle
                        </Text>}
                        badgeStyle={styles.badgeStyle}
                        />
                        
                        
                        <Button
                        title="Montre-moi les résultats"
                        style={styles.btnPrimary}
                        onPress={() => Alert.alert('Simple Button pressed')}
                        />
                        
                        
                        </View>
                        
                        
                        
                        
                        </View>    
                        )
                    };
                    
                    
                    
                    
                    export default FilterScreen