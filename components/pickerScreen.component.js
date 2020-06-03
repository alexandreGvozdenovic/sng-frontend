import React from 'react';
import { View, Text, StatusBar, Platform, StyleSheet } from 'react-native';
import { DatePicker, List } from '@ant-design/react-native';
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
    
    shadowOffset:{width: 0, height: 8},
    shadowRadius: 16,
    shadowColor: "#2a2b2a",
  },
  
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0

  },
  
  h1: { 
    textAlign: "center",
    fontFamily: "PT Sans",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "31px",
    paddingTop: "3%",
    
    
    /* identical to box height */
    
    
    /* Salmon */
    
    color: "#FF8367",
    
  },
  
  content: {
    marginTop: "112px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
  },
  
  bottomleft : {
    /* Envie de pizza ? */
    /* H2 */
    
    fontFamily: "PT Sans",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "31px",
    /* identical to box height */
    
    
    color: "#FFFFFF",
    position: "absolute",
    width: "164px",
    height: "31px",
    left: "48px",
    top: "179px",
  },
  
  imageDeFont:{
    backgroundImage: 'url("image/Texture.png")',
  },
  
  
  image: {
    borderRadius: "8px",
    width: "100%",
    minHeight: "100px",
    backgroundImage: 'url("restaurant.webp")',
    backgroundSize: "cover",
  },
  
  input: {
    
    /* Cloud */
    
    backgroundColor: "#FFFFFF",
    border: "1px solid rgba(42, 43, 42, 0.16)",
    boxSizing: "borderBox",
    borderRadius: "8px",
    width: "100%",
    padding: "15px",
    
    
  },
  
  locationInput: {
    marginBottom: "16px",
    
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
    
  }
});  

function HomeScreen() {
  
  return (
    
    <View style={styles.imageDeFont}>
    <View style={styles.container}>
    <header style={styles.header}> 
    <h1>style={styles.h1} Shake'n'Go </h1>
    
    </header>
    
    <View style={styles.content}><View style={styles.bottomleft}>Envie d'une pizza ?</View><View style={styles.image}></View>
    <h2 style={styles.title}> On sort ? </h2>
    
    <AntDesign name="enviromento" size={24} color="rgba(42, 43, 42, 0.4)" />
    <TextInput style={styles.locationInput} name="" id=""></TextInput>
    <List>
    <DatePicker
    
    value={this.state.value}
    mode="date"
    defaultDate={new Date()}
    minDate={new Date(2015, 7, 6)}
    maxDate={new Date(2026, 11, 3)}
    onChange={this.onChange}
    format="YYYY-MM-DD"
    >
    <List.Item arrow="horizontal">Select Date</List.Item>
    
    </DatePicker>
    
    </List>
    <Button
    title="On y va !"
    style={styles.btnPrimary}
    onPress={() => Alert.alert('Simple Button pressed')}
    />
    
    
    </View>

    
    
    </View>
    </View>    
    )
  };
  
  
  
  
  export default HomeScreen
  
  
  