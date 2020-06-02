import React from 'react';
import { Text, View, Platform, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  return (
    <SafeAreaView 
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        }}>

      <Text 
        style={{
          textAlign:'center',
          color: '#FF8367', 
          fontWeight:'bold', 
          fontStyle:'italic', 
          fontSize: 24}}>

            Shake'n'Go

      </Text>

      <Image 
        source={require('./assets/imagesTest/Atalante.png')}
        style={{
          marginTop: 12,
          width:'100%'}}
      />
      <View 
        style={{
          position:'absolute',
          top:'37%',
          backgroundColor:'#FFFFFF',
          borderTopLeftRadius: 32,
          display:'flex',
          flexDirection:'column'
        }}
      
      >
        <Text
          style={{
            fontWeight:'bold', 
            fontSize: 32,
            marginLeft: 26,
            marginTop: 32
            }}
        >

              L'Atalante
              
        </Text>
        
        <Text style={{
          marginLeft: 26,
          marginTop: 8
        }}>
          <AntDesign name="star" size={16} color="#FF8367" />
          <AntDesign name="star" size={16} color="#FF8367" />
          <AntDesign name="star" size={16} color="#FF8367" />
          <AntDesign name="star" size={16} color="#FF8367" />
          <AntDesign name="staro" size={16} color="#FF8367" />
        </Text>
        <View style={{
          display:'flex', 
          flexDirection:'row', 
          alignItems:'center', 
          marginTop:8, 
          marginLeft:26
          }}>
          <AntDesign name="enviromento" size={24} color="#2A2B2A" />
          <Text style={{
            marginLeft: 8,
            color: '#2A2B2A',
            fontSize: 16
          }}>
            26 Quai de la Marne, 75019 Paris
          </Text>
        </View>

        <View style={{
          display:'flex', 
          flexDirection:'row',
          flexWrap:'wrap', 
          alignItems:'center', 
          marginTop:8, 
          marginLeft:26,
          marginEnd: 26,
          }}>
          <Badge 
            containerStyle={{marginRight: 8, marginTop:8}} 
            value={
              <Text style={{
                fontSize: 16, 
                color:'#FF8367', 
                paddingHorizontal: 16, 
                paddingVertical: 3
              }}>
                Bar à bières
              </Text>}

            badgeStyle={{
              backgroundColor: 'rgba(255, 131, 103, 0.24)',
              borderColor: '#FF8367',
              height:28,
              borderRadius: 20
            }}
          />

          <Badge 
            containerStyle={{marginRight: 8, marginTop:8}} 
            value={
              <Text style={{
                fontSize: 16, 
                color:'#FF8367', 
                paddingHorizontal: 16, 
                paddingVertical: 3
              }}>
                Restaurent
              </Text>}
              
            badgeStyle={{
              backgroundColor: 'rgba(255, 131, 103, 0.24)',
              borderColor: '#FF8367',
              height:28,
              borderRadius: 20
            }}
          />
          <Badge 
            containerStyle={{marginRight: 8, marginTop:8}} 
            value={
              <Text style={{
                fontSize: 16, 
                color:'#FF8367', 
                paddingHorizontal: 16, 
                paddingVertical: 3
              }}>
                Bar à
              </Text>}
              
            badgeStyle={{
              backgroundColor: 'rgba(255, 131, 103, 0.24)',
              borderColor: '#FF8367',
              height:28,
              borderRadius: 20
            }}
          />
          <Badge 
            containerStyle={{marginRight: 8, marginTop: 8}} 
            value={
              <Text style={{
                fontSize: 16, 
                color:'#FF8367', 
                paddingHorizontal: 16, 
                paddingVertical: 3
              }}>
                Bar à bières
              </Text>}
              
            badgeStyle={{
              backgroundColor: 'rgba(255, 131, 103, 0.24)',
              borderColor: '#FF8367',
              height:28,
              borderRadius: 20
            }}
          />
        </View>
      
      <Text 
        style={{
          marginLeft:26,
          marginTop: 32,
          marginRight: 26,
          flexGrow:1
        }}
      >
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
