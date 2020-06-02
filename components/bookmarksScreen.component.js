import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function BookmarksScreen() {

    return (
        <View style={styles.container}>
                <View>
                    <Text>Bookmarks Screen</Text>
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

export default BookmarksScreen