import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Share,
  AsyncStorage,
  Alert,
} from "react-native";
import Header from "./headerScreen.component";
import { Badge, Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { AppLoading } from "expo";
import {
  useFonts,
  PTSans_400Regular,
  PTSans_700Bold,
  OpenSans_400Regular,
} from "@expo-google-fonts/dev";
//redux
import { connect } from "react-redux";
import GestureRecognizer, {
    swipeDirections,
} from "react-native-swipe-gestures";

// fake data pour travailler l'intégration
// const {suggestions} = require('../assets/datas/suggestions.json');

function ResultScreen({
    navigation,
    addToWishlist,
    suggestionCount,
    suggestionNumber,
    suggestions,
}) {
    const [gestureName, setGestureName] = useState("none");
    // Alert for wishList
    const alertWishlist = (title, message) =>
        Alert.alert(
            title,
            message,
            [
                {
                    text: "Ok",
                },
            ],
            { cancelable: false }
        );
    // Sharing logic  {onShare}
    const onShare = async (nom, adresse, type) => {
        try {
            const result = await Share.share({
                message: `Tiens, j'ai trouvé ce ${type} sur Shake'n'Go : ${nom}. C'est au ${adresse}. Ça te tente?`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    // Fonction d'ajout en Wishlist dans le local storage
    const onLike = async (place) => {
        var readWishlist = await AsyncStorage.getItem("wishlist", function (
            error,
            data
        ) {
            var wishlistData = JSON.parse(data);
            return wishlistData;
        });
        if (readWishlist === null) {
            AsyncStorage.setItem("wishlist", JSON.stringify([place]));
            alertWishlist(
                "Super !",
                `${place.nom} a bien été ajouté à la wishlist`
            );
        } else {
            var parsedReadWishlist = JSON.parse(readWishlist);
            var placeExist = parsedReadWishlist.find(
                (e) => e.place_id == place.place_id
            );
            if (placeExist === undefined) {
                var newWishList = [...parsedReadWishlist, place];
                AsyncStorage.setItem("wishlist", JSON.stringify(newWishList));
                alertWishlist(
                    "Super !",
                    `${place.nom} a bien été ajouté à la wishlist`
                );
            } else {
                alertWishlist(
                    "Oups !",
                    `${place.nom} est déjà dans la wishlist`
                );
            }
        }
<<<<<<< HEAD
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  // Fonction d'ajout en Wishlist dans le local storage
  const onLike = async (place) => {
    // AsyncStorage.clear()
    var readWishlist = await AsyncStorage.getItem("wishlist", function (
      error,
      data
    ) {
      var wishlistData = JSON.parse(data);
      return wishlistData;
    });
    if (readWishlist === null) {
      AsyncStorage.setItem("wishlist", JSON.stringify([place]));
    } else {
      var parsedReadWishlist = JSON.parse(readWishlist);
      var placeExist = parsedReadWishlist.find(
        (e) => e.place_id == place.place_id
      );
      if (placeExist === undefined) {
        var newWishList = [...parsedReadWishlist, place];
        AsyncStorage.setItem("wishlist", JSON.stringify(newWishList));
        alertWishlist(
          "Super !",
          `${place.nom} a bien été ajouté à la wishlist`
        );
      } else {
        alertWishlist("Oups !", `${place.nom} est déjà dans la wishlist`);
      }
    }
  };

  if (suggestionCount > 3) {
    navigation.navigate("Filter");
  }

  var currentlyOpened = (
    <View style={styles.containerOpen}>
      <AntDesign
        name="clockcircleo"
        size={16}
        color="#1DBC84"
        style={{ marginRight: 4 }}
      />
      <Text style={styles.open}>Ouvert</Text>
    </View>
  );
  var currentlyClosed = (
    <View style={styles.containerOpen}>
      <AntDesign
        name="clockcircleo"
        size={16}
        color="#DB331F"
        style={{ marginRight: 4 }}
      />
      <Text style={styles.close}>Fermé</Text>
    </View>
  );

  var rating = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.round(suggestions[suggestionNumber].rating)) {
      rating.push(<AntDesign key={i} name="star" size={16} color="#FF8367" />);
    } else {
      rating.push(<AntDesign key={i} name="staro" size={16} color="#FF8367" />);
    }
  }

  // Swipe
  function onSwipeUp(gestureState) {
    navigation.navigate("Details");
  }

  function onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    setGestureName(gestureName);
  }
=======
    };

    if (suggestionCount > 3) {
        navigation.navigate("Filter");
    }

    var currentlyOpened = (
        <View style={styles.containerOpen}>
            <AntDesign
                name="clockcircleo"
                size={16}
                color="#1DBC84"
                style={{ marginRight: 4 }}
            />
            <Text style={styles.open}>Ouvert</Text>
        </View>
    );
    var currentlyClosed = (
        <View style={styles.containerOpen}>
            <AntDesign
                name="clockcircleo"
                size={16}
                color="#DB331F"
                style={{ marginRight: 4 }}
            />
            <Text style={styles.close}>Fermé</Text>
        </View>
    );
>>>>>>> a4cdd1476bdc6ab0d782f6d75317a807da1228cb

    var rating = [];
    for (let i = 0; i < 5; i++) {
        if (i < Math.round(suggestions[suggestionNumber].rating)) {
            rating.push(
                <AntDesign key={i} name="star" size={16} color="#FF8367" />
            );
        } else {
            rating.push(
                <AntDesign key={i} name="staro" size={16} color="#FF8367" />
            );
        }
    }

    // Swipe
    function onSwipeUp(gestureState) {
        navigation.navigate("Details");
    }

<<<<<<< HEAD
  if (!fontsLoaded && suggestions.length > 0) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: suggestions[suggestionNumber].photo }}
          style={styles.picture}
        >
          <Header />
          <GestureRecognizer
            onSwipe={(direction, state) => onSwipe(direction, state)}
            onSwipeUp={(state) => onSwipeUp(state)}
            config={config}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onPress={() =>
                  onShare(
                    suggestions[suggestionNumber].nom,
                    suggestions[suggestionNumber].adresse,
                    suggestions[suggestionNumber].type
                  )
                }
                icon={
                  <AntDesign
                    name="sharealt"
                    size={24}
                    color="#FFFFFF"
                    style={{ marginTop: "auto" }}
                  />
                }
                containerStyle={styles.likeButtonContainer}
                buttonStyle={styles.likeButton}
              />
              <Button
                icon={
                  <AntDesign
                    name="hearto"
                    size={24}
                    color="#FFFFFF"
                    style={{ marginTop: "auto" }}
                  />
                }
                containerStyle={styles.likeButtonContainer}
                buttonStyle={styles.likeButton}
                onPress={() => {
                  onLike(suggestions[suggestionNumber]);
                  addToWishlist(suggestions[suggestionNumber]);
                }}
              />
            </View>
            <View style={styles.containerCard}>
              <Text style={styles.title}>
                {suggestions[suggestionNumber].nom}
              </Text>
              <View style={styles.containerRatingOpen}>
                <Text>{rating}</Text>
                {suggestions[suggestionNumber].isOpen === true
                  ? currentlyOpened
                  : currentlyClosed}
              </View>

              <View style={styles.containerAdress}>
                <AntDesign
                  name="enviromento"
                  size={24}
                  color="rgba(42, 43, 42, 0.4)"
                />
                <Text style={styles.adressText}>
                  {suggestions[suggestionNumber].adresse}
                </Text>
              </View>

              <View style={styles.containerBadges}>
                <Badge
                  containerStyle={{ marginRight: 8, marginTop: 8 }}
                  value={
                    <Text style={styles.badgeText}>
                      {suggestions[suggestionNumber].type}
                    </Text>
                  }
                  badgeStyle={styles.badgeStyle}
                />
              </View>

              <Text style={styles.description}>
                {suggestions[suggestionNumber].description}
              </Text>
            </View>
          </GestureRecognizer>
        </ImageBackground>
        <TouchableOpacity
          style={styles.moreDetails}
          onPress={() => navigation.navigate("Details")}
        >
          <Text style={styles.moreDetailsText}>
            En savoir plus <AntDesign name="down" size={16} color="#FF8367" />
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    suggestionCount: state.suggestionCount,
    suggestionNumber: state.suggestionNumber,
    suggestions: state.suggestions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishlist: function (place) {
      dispatch({ type: "addToWishlist", place: place });
    },
    resetSuggestionNumber: function () {
      dispatch({ type: "resetSuggestionNumber" });
    },
  };
=======
    function onSwipe(gestureName, gestureState) {
        const {
            SWIPE_UP,
            SWIPE_DOWN,
            SWIPE_LEFT,
            SWIPE_RIGHT,
        } = swipeDirections;
        setGestureName(gestureName);
    }

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 40,
    };

    let [fontsLoaded] = useFonts({
        PTSans_400Regular,
        PTSans_700Bold,
        OpenSans_400Regular,
    });

    if (!fontsLoaded && suggestions.length > 0) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground
                    source={{ uri: suggestions[suggestionNumber].photo }}
                    style={styles.picture}
                >
                    <Header />
                    <GestureRecognizer
                        onSwipe={(direction, state) =>
                            onSwipe(direction, state)
                        }
                        onSwipeUp={(state) => onSwipeUp(state)}
                        config={config}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button
                                onPress={() =>
                                    onShare(
                                        suggestions[suggestionNumber].nom,
                                        suggestions[suggestionNumber].adresse,
                                        suggestions[suggestionNumber].type
                                    )
                                }
                                icon={
                                    <AntDesign
                                        name="sharealt"
                                        size={24}
                                        color="#FFFFFF"
                                        style={{ marginTop: "auto" }}
                                    />
                                }
                                containerStyle={styles.likeButtonContainer}
                                buttonStyle={styles.likeButton}
                            />
                            <Button
                                icon={
                                    <AntDesign
                                        name="hearto"
                                        size={24}
                                        color="#FFFFFF"
                                        style={{ marginTop: "auto" }}
                                    />
                                }
                                containerStyle={styles.likeButtonContainer}
                                buttonStyle={styles.likeButton}
                                onPress={() => {
                                    onLike(suggestions[suggestionNumber]);
                                    addToWishlist(
                                        suggestions[suggestionNumber]
                                    );
                                }}
                            />
                        </View>
                        <View style={styles.containerCard}>
                            <Text style={styles.title}>
                                {suggestions[suggestionNumber].nom}
                            </Text>
                            <View style={styles.containerRatingOpen}>
                                <Text>{rating}</Text>
                                {suggestions[suggestionNumber].isOpen === true
                                    ? currentlyOpened
                                    : currentlyClosed}
                            </View>

                            <View style={styles.containerAdress}>
                                <AntDesign
                                    name="enviromento"
                                    size={24}
                                    color="rgba(42, 43, 42, 0.4)"
                                />
                                <Text style={styles.adressText}>
                                    {suggestions[suggestionNumber].adresse}
                                </Text>
                            </View>

                            <View style={styles.containerBadges}>
                                <Badge
                                    containerStyle={{
                                        marginRight: 8,
                                        marginTop: 8,
                                    }}
                                    value={
                                        <Text style={styles.badgeText}>
                                            {suggestions[suggestionNumber].type}
                                        </Text>
                                    }
                                    badgeStyle={styles.badgeStyle}
                                />
                            </View>

                            <Text style={styles.description}>
                                {suggestions[suggestionNumber].description}
                            </Text>
                        </View>
                    </GestureRecognizer>
                </ImageBackground>
                <TouchableOpacity
                    style={styles.moreDetails}
                    onPress={() => navigation.navigate("Details")}
                >
                    <Text style={styles.moreDetailsText}>
                        En savoir plus{" "}
                        <AntDesign name="down" size={16} color="#FF8367" />
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        suggestionCount: state.suggestionCount,
        suggestionNumber: state.suggestionNumber,
        suggestions: state.suggestions,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addToWishlist: function (place) {
            dispatch({ type: "addToWishlist", place: place });
        },
        resetSuggestionNumber: function () {
            dispatch({ type: "resetSuggestionNumber" });
        },
    };
>>>>>>> a4cdd1476bdc6ab0d782f6d75317a807da1228cb
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen);

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    height: "100%",
  },
  containerCard: {
    marginTop: 128,
    backgroundColor: "#FCFCFC",
    borderTopLeftRadius: 32,
    display: "flex",
  },
  picture: {
    height: 275,
  },
  title: {
    fontFamily: "PTSans_700Bold",
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 26,
    marginTop: 32,
  },
  containerRatingOpen: {
    marginLeft: 26,
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
  },
  containerOpen: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    alignItems: "center",
  },
  open: {
    color: "#1DBC84",
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    fontWeight: "bold",
  },
  close: {
    color: "#DB331F",
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    fontWeight: "bold",
  },
  containerAdress: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 26,
  },
  adressText: {
    marginLeft: 8,
    color: "rgba(42, 43, 42, 0.4)",
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    marginRight: 26,
  },
  containerBadges: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 26,
    marginEnd: 26,
  },
  badgeText: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: "#FF8367",
    paddingHorizontal: 16,
    paddingVertical: 3,
  },
  badgeStyle: {
    backgroundColor: "rgba(255, 131, 103, 0.24)",
    borderColor: "#FF8367",
    height: 28,
    borderRadius: 20,
  },
  description: {
    marginLeft: 26,
    fontFamily: "OpenSans_400Regular",
    marginTop: 32,
    marginRight: 26,
  },
  likeButton: {
    width: 44,
    height: 44,
    backgroundColor: "#FF8367",
    borderRadius: 40,
  },
  likeButtonContainer: {
    alignSelf: "flex-end",
    marginRight: 16,
    marginTop: 16,
  },
  moreDetails: {
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 24,
  },
  moreDetailsText: {
    color: "#FF8367",
    fontSize: 14,
    fontWeight: "bold",
  },
=======
    container: {
        flex: 1,
        backgroundColor: "#FCFCFC",
        height: "100%",
    },
    containerCard: {
        marginTop: 128,
        backgroundColor: "#FCFCFC",
        borderTopLeftRadius: 32,
        display: "flex",
    },
    picture: {
        height: 275,
    },
    title: {
        fontFamily: "PTSans_700Bold",
        fontSize: 32,
        fontWeight: "bold",
        marginLeft: 26,
        marginTop: 32,
    },
    containerRatingOpen: {
        marginLeft: 26,
        marginTop: 8,
        display: "flex",
        flexDirection: "row",
    },
    containerOpen: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 20,
        alignItems: "center",
    },
    open: {
        color: "#1DBC84",
        fontFamily: "OpenSans_400Regular",
        fontSize: 14,
        fontWeight: "bold",
    },
    close: {
        color: "#DB331F",
        fontFamily: "OpenSans_400Regular",
        fontSize: 14,
        fontWeight: "bold",
    },
    containerAdress: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        marginLeft: 26,
    },
    adressText: {
        marginLeft: 8,
        color: "rgba(42, 43, 42, 0.4)",
        fontFamily: "OpenSans_400Regular",
        fontSize: 16,
        marginRight: 26,
    },
    containerBadges: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginTop: 8,
        marginLeft: 26,
        marginEnd: 26,
    },
    badgeText: {
        fontSize: 16,
        fontFamily: "OpenSans_400Regular",
        color: "#FF8367",
        paddingHorizontal: 16,
        paddingVertical: 3,
    },
    badgeStyle: {
        backgroundColor: "rgba(255, 131, 103, 0.24)",
        borderColor: "#FF8367",
        height: 28,
        borderRadius: 20,
    },
    description: {
        marginLeft: 26,
        fontFamily: "OpenSans_400Regular",
        marginTop: 32,
        marginRight: 26,
    },
    likeButton: {
        width: 44,
        height: 44,
        backgroundColor: "#FF8367",
        borderRadius: 40,
    },
    likeButtonContainer: {
        alignSelf: "flex-end",
        marginRight: 16,
        marginTop: 16,
    },
    moreDetails: {
        alignItems: "center",
        marginTop: "auto",
        marginBottom: 24,
    },
    moreDetailsText: {
        color: "#FF8367",
        fontSize: 14,
        fontWeight: "bold",
    },
>>>>>>> a4cdd1476bdc6ab0d782f6d75317a807da1228cb
});
