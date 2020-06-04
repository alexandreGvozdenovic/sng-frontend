import React, { useState } from 'react';
import { View, Platform, StyleSheet, Text, Picker } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import {
    useFonts,
    PTSans_400Regular,
    PTSans_700Bold,
    OpenSans_400Regular,
    OpenSans_700Bold,
  } from '@expo-google-fonts/dev';
import { AntDesign } from '@expo/vector-icons';

const {quartiers} = require('../scripts/quartiers');


 
const TestPicker = () => {
  const [visible, setVisible] = useState(false);
  const [quartier, setQuartier] = useState();
  const [position, setPosition] = useState();


 
  const toggleOverlay = () => {
    setVisible(!visible);
  }
 
  let displayListeQuartiers;
  displayListeQuartiers = quartiers.map(q => {
    return <Picker.Item key={q.value} label={q.label} value={q.label} position={q.value}/>
  })

  let displayTitle;
  if(quartier) {
    displayTitle = quartier;
  } else {
    displayTitle = `Choisis ton quartier !`
  }

  return (
    <View>
      <View style={{marginTop:50, alignItems:'center'}}>
      <Button 
                  onPress={() => {toggleOverlay()}}
                  icon={          
                    <AntDesign name="enviromento" size={24} color="rgba(42, 43, 42, 0.4)" />
                } 
                  title={`${displayTitle}`}
                  titleStyle={styles.pickerText}
                  buttonStyle={styles.pickers} 
                  />
      </View>

      <Overlay isVisible={visible} onBackdropPress={() => {toggleOverlay()}}>
            <Text style={styles.overlayText}>Choisis un quartier parisien : </Text>
            <View style={{width:320, height:240, margin:8}}>
            <Picker
              selectedValue={quartier}
              style={{width: 320}}
              onValueChange={(value,) =>
                {setQuartier(value)}
              }>
              {displayListeQuartiers}
            </Picker>
            </View>
            <View style={styles.overlayBtns}>
              <Button
                title="Fermer"
                titleStyle={styles.btnTextDismiss}
                buttonStyle={styles.btnModalDismiss}
                onPress={() => {toggleOverlay()}}/> 
            </View>
          </Overlay>
    </View>
  );
};
 
const styles = StyleSheet.create({
    pickers:{
        backgroundColor:'#FFFFFF',
        borderWidth:1,
        borderColor:'rgba(42, 43, 42, 0.16)',
        width:320,
        marginBottom:16,
        justifyContent:'flex-start',
    },
    pickerText:{
        color:'rgba(42, 43, 42, 0.8)',
        fontFamily:'OpenSans_400Regular',
        fontSize: 16,
        lineHeight: 22,
        marginLeft:10,
    },
    overlayText:{
      textAlign:'left',
      fontFamily:'PTSans_700Bold',
      color: '#FF8367',
      width:250,
      fontSize:24,
      lineHeight:31,
      marginTop:8, 
      marginLeft:16,
    },
    overlayBtns:{
      alignItems:'flex-end'
    },
    btnModalSubmit:{
      width:150,
      margin:10,
      backgroundColor:'#FF8367'
    },
    btnTextOK:{
      fontFamily:'PTSans_700Bold',
      fontSize:18,
      lineHeight:23,
      color:"#FFFFFF",
    },
    btnTextDismiss:{
      fontFamily:'PTSans_700Bold',
      fontSize:18,
      lineHeight:23,
      color:"#FF8367",
    },
    btnModalDismiss:{
      width:150,
      margin:10,
      backgroundColor:'#FFFFFF',
      borderWidth:1,
      borderColor:"#FF8367"
    },
})

export default TestPicker;