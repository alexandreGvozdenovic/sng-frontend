import * as React from 'react';
import { Button } from 'react-native-elements';
import { Fontisto } from '@expo/vector-icons';


export default function ButtonTest () {
    return (
      <Button 
        containerStyle={{
          bottom:13
        }}
        buttonStyle={{
          backgroundColor:'#FF8367',
          borderRadius:100,
          width:56,
          height:56,
          borderWidth:3,
          borderColor:'#fff'
        }}
        icon={
          <Fontisto name="cocktail" size={24} color="#fff" />
        }
        onPress={() => console.log('Je clique')}
      />
    )
}