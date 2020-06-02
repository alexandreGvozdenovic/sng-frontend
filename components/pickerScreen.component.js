import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function HomeScreen() {

    return (
        <View style={styles.container}>
                <View>
                    <Text>Home Screen</Text>
                </View>
        </View>    
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: '#ffffff',
    },
  });

export default HomeScreen