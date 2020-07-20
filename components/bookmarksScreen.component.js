import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
  StatusBar,
  Share,
  AsyncStorage,
} from "react-native";
import {
  Badge,
  Button,
  Card,
  Icon,
  Overlay,
  ListItem,
} from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import {
  useFonts,
  PTSans_400Regular,
  PTSans_700Bold,
  OpenSans_400Regular,
  OpenSans_700Bold,
} from "@expo-google-fonts/dev";
import Header from "./headerScreen.component";
import { AppLoading } from "expo";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

var backgroundTexture = require("../assets/images/Texture.png");

function BookMarksScreen({ userWishlist }) {
  const [localStorageWishlist, setLocalStorageWishlist] = useState([]);
  const [filter, setFilter] = useState("Tout");
  const [isFiltered, setIsFiltered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [overlayPhoto, setOverlayPhoto] = useState("");
  const [overlayNom, setOverlayNom] = useState("");
  const [overlayRating, setOverlayRating] = useState([]);
  const [overlayComments, setOverlayComments] = useState([]);
  const [overlayOpenClosed, setOverlayOpenClosed] = useState();
  const [overlayAdresse, setOverlayAdresse] = useState("");
  const [overlayPosition, setOverlayPosition] = useState({});
  const [overlayHoraires, setOverlayHoraires] = useState([]);
  const [overlayDescription, setOverlayDescription] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("wishlist", function (error, data) {
        var wishlistData = JSON.parse(data);
        setLocalStorageWishlist(wishlistData);
      });
    }, [])
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

  const onDelete = (placeId) => {
    var arrayCopy = [...localStorageWishlist];
    var updatedArray = arrayCopy.filter((e) => e.place_id !== placeId);
    setLocalStorageWishlist(updatedArray);
    AsyncStorage.setItem("wishlist", JSON.stringify(updatedArray));
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const overlayDisplay = (
    photo,
    nom,
    rating,
    comments,
    openClosed,
    adresse,
    position,
    horaires,
    description
  ) => {
    toggleOverlay();
    setOverlayPhoto(photo);
    setOverlayNom(nom);
    // setOverlayRating(overlayRating.length = 0)
    setOverlayRating(rating);
    setOverlayComments(comments);
    setOverlayOpenClosed(openClosed);
    setOverlayAdresse(adresse);
    setOverlayPosition(position);
    setOverlayHoraires(horaires);
    setOverlayDescription(description);
  };

  var today = new Date();

  let filterList = ["Tout"];
  localStorageWishlist.map((e) => {
    const type = e.type;
    if (!filterList.includes(type)) {
      filterList.push(type);
    }
  });

  const isActiveFunct = (type) => {
    let badgeStyle =
      type === filter || type === ""
        ? styles.badgeActiveStyle
        : styles.badgeInactiveStyle;
    return badgeStyle;
  };
  const filters = [];
  filterList.map((e, i) => {
    filters.push(
      <Badge
        key={"badge" + i}
        containerStyle={{ marginRight: 8, marginTop: 8 }}
        value={<Text style={styles.badgeText}>{e}</Text>}
        badgeStyle={isActiveFunct(e)}
        onPress={() => {
          setFilter(e);
          setIsFiltered(true);
        }}
      />
    );
  });

  let filteredWishlist = [];
  function filterByCat(categorie) {
    if (isFiltered && filter !== "Tout") {
      filteredWishlist = localStorageWishlist.filter(
        (e) => e.type === categorie
      );
    } else {
      filteredWishlist = localStorageWishlist;
    }
  }

  filterByCat(filter);

  let wishlist = [];
  wishlist = filteredWishlist.map((p, i) => {
    var rating = [];
    for (var k = 0; k < 5; k++) {
      if (k < Math.floor(p.rating)) {
        rating.push(
          <AntDesign
            key={k + "" + p.place_id}
            name="star"
            size={16}
            color="#FF8367"
          />
        );
      } else {
        rating.push(
          <AntDesign
            key={k + "" + p.place_id}
            name="staro"
            size={16}
            color="#FF8367"
          />
        );
      }
    }
    let comments = p.reviews.map((l, y) => {
      let ratingReview = [];
      for (let j = 0; j < 5; j++) {
        if (j < Math.round(l.note)) {
          ratingReview.push(
            <AntDesign key={y + j} name="star" size={16} color="#FF8367" />
          );
        } else {
          ratingReview.push(
            <AntDesign key={y + j} name="staro" size={16} color="#FF8367" />
          );
        }
      }
      return (
        <View style={styles.overlayListItemContainer}>
          <ListItem
            key={y}
            containerStyle={styles.overlayListItem}
            titleStyle={styles.overlayName}
            leftAvatar={{
              source: { uri: l.avatar },
              containerStyle: styles.overlayAvatar,
            }}
            title={l.auteur}
            subtitle={<Text>{ratingReview}</Text>}
          />
          <Text style={styles.overlayComment}>{l.texte}</Text>
        </View>
      );
    });
    return (
      <Card key={p.place_id + "" + i} containerStyle={styles.cardContainer}>
        <TouchableOpacity
          onPress={() => {
            overlayDisplay(
              p.photo,
              p.nom,
              rating,
              comments,
              p.isOpen,
              p.adresse,
              p.coords,
              p.openingHours,
              p.description
            );
          }}
        >
          <Image source={{ uri: p.photo }} style={styles.cardImage}></Image>
        </TouchableOpacity>
        <View style={styles.cardTitleAndButtonsContainer}>
          <View style={styles.cardTitleAndRating}>
            <Text style={styles.cardTitle}>{p.nom}</Text>
            <Text style={styles.cardRating}>{rating}</Text>
          </View>
          <View style={styles.cardButtonsContainerView}>
            <Button
              onPress={() => onShare(p.nom, p.adresse, p.type)}
              icon={
                <AntDesign
                  name="sharealt"
                  size={24}
                  color="#FFFFFF"
                  style={{ marginRight: "auto" }}
                />
              }
              containerStyle={styles.cardButtonsContainerStyle}
              buttonStyle={styles.cardButtons}
            />
            <Button
              onPress={() => onDelete(p.place_id)}
              icon={<AntDesign name="delete" size={24} color="#FFFFFF" />}
              containerStyle={styles.cardButtonsContainerStyle}
              buttonStyle={styles.cardButtons}
            />
          </View>
        </View>
      </Card>
    );
  });

  var currentlyOpened = (
    <View style={styles.overlayContainerOpen}>
      <AntDesign
        name="clockcircleo"
        size={16}
        color="#1DBC84"
        style={{ marginRight: 4 }}
      />
      <Text style={styles.overlayOpen}>Ouvert</Text>
    </View>
  );
  var currentlyClosed = (
    <View style={styles.overlayContainerOpen}>
      <AntDesign
        name="clockcircleo"
        size={16}
        color="#DB331F"
        style={{ marginRight: 4 }}
      />
      <Text style={styles.overlayClose}>Fermé</Text>
    </View>
  );
  var overlayWishList;
  if (wishlist.length > 0 && overlayHoraires.length > 0) {
    overlayWishList = (
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        fullScreen={true}
      >
        <SafeAreaView>
          <ScrollView stickyHeaderIndices={[0]}>
            <TouchableOpacity
              onPress={() => toggleOverlay()}
              style={{ alignItems: "flex-end", marginRight: 26 }}
            >
              <AntDesign
                name="closecircle"
                size={40}
                color="rgba(255, 131, 103, 0.8)"
              />
            </TouchableOpacity>
            <Image
              source={{ uri: overlayPhoto }}
              style={styles.overlayImage}
            ></Image>
            <Text style={styles.overlayTitleH1}>{overlayNom}</Text>
            <View style={styles.overlayContainerRatingOpen}>
              <Text>{overlayRating}</Text>
              {overlayOpenClosed === true ? currentlyOpened : currentlyClosed}
            </View>
            <View style={styles.overlayContainerAdress}>
              <AntDesign
                name="enviromento"
                size={24}
                color="rgba(42, 43, 42, 0.4)"
              />
              <Text style={styles.overlayAdressText}>{overlayAdresse}</Text>
            </View>
            <Text style={styles.overlayDescription}>{overlayDescription}</Text>
            <Text style={styles.overlayTitleH2}>On y va comment ?</Text>
            <View style={styles.overlayMapContainer}>
              <MapView
                style={styles.overlayMapStyle}
                initialRegion={{
                  latitude: overlayPosition.lat,
                  longitude: overlayPosition.lng,
                  latitudeDelta: 0.0015,
                  longitudeDelta: 0.0015,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: overlayPosition.lat,
                    longitude: overlayPosition.lng,
                  }}
                />
              </MapView>
            </View>

            <Text style={styles.overlayTitleH2}>Horaires</Text>
            <View style={styles.overlayContainerHoraires}>
              <View style={styles.overlayContainerJours}>
                <Text
                  style={
                    today.getDay() === 1
                      ? styles.overlayTextJoursToday
                      : styles.overlayTextJours
                  }
                >
                  {overlayHoraires[0].slice(0, 5)}
                </Text>
                <Text
                  style={
                    today.getDay() === 2
                      ? styles.overlayTextJoursToday
                      : styles.overlayTextJours
                  }
                >
                  {overlayHoraires[1].slice(0, 5)}
                </Text>
                <Text
                  style={
                    today.getDay() === 3
                      ? styles.overlayTextJoursToday
                      : styles.overlayTextJours
                  }
                >
                  {overlayHoraires[2].slice(0, 8)}
                </Text>
                <Text
                  style={
                    today.getDay() === 4
                      ? styles.overlayTextJoursToday
                      : styles.overlayTextJours
                  }
                >
                  {overlayHoraires[3].slice(0, 5)}
                </Text>
                <Text
                  style={
                    today.getDay() === 5
                      ? styles.overlayTextJoursToday
                      : styles.overlayTextJours
                  }
                >
                  {overlayHoraires[4].slice(0, 8)}
                </Text>
                <Text
                  style={
                    today.getDay() === 6
                      ? styles.overlayTextJoursToday
                      : styles.overlayTextJours
                  }
                >
                  {overlayHoraires[5].slice(0, 6)}
                </Text>
                <Text
                  style={
                    today.getDay() === 0
                      ? styles.overlayTextJoursToday
                      : styles.overlayTextJours
                  }
                >
                  {overlayHoraires[6].slice(0, 8)}
                </Text>
              </View>

              <View>
                <Text
                  style={
                    today.getDay() === 1
                      ? styles.overlayTextHorairesToday
                      : styles.overlayTextHoraires
                  }
                >
                  {overlayHoraires[0].slice(7, overlayHoraires[0].length)}
                </Text>
                <Text
                  style={
                    today.getDay() === 2
                      ? styles.overlayTextHorairesToday
                      : styles.overlayTextHoraires
                  }
                >
                  {overlayHoraires[1].slice(7, overlayHoraires[1].length)}
                </Text>
                <Text
                  style={
                    today.getDay() === 3
                      ? styles.overlayTextHorairesToday
                      : styles.overlayTextHoraires
                  }
                >
                  {overlayHoraires[2].slice(10, overlayHoraires[2].length)}
                </Text>
                <Text
                  style={
                    today.getDay() === 4
                      ? styles.overlayTextHorairesToday
                      : styles.overlayTextHoraires
                  }
                >
                  {overlayHoraires[3].slice(7, overlayHoraires[3].length)}
                </Text>
                <Text
                  style={
                    today.getDay() === 5
                      ? styles.overlayTextHorairesToday
                      : styles.overlayTextHoraires
                  }
                >
                  {overlayHoraires[4].slice(10, overlayHoraires[4].length)}
                </Text>
                <Text
                  style={
                    today.getDay() === 6
                      ? styles.overlayTextHorairesToday
                      : styles.overlayTextHoraires
                  }
                >
                  {overlayHoraires[5].slice(8, overlayHoraires[5].length)}
                </Text>
                <Text
                  style={
                    today.getDay() === 0
                      ? styles.overlayTextHorairesToday
                      : styles.overlayTextHoraires
                  }
                >
                  {overlayHoraires[6].slice(10, overlayHoraires[6].length)}
                </Text>
              </View>
            </View>
            <Text style={styles.overlayTitleH2}>Quelques avis</Text>

            {overlayComments}
          </ScrollView>
        </SafeAreaView>
      </Overlay>
    );
  }

  let [fontsLoaded] = useFonts({
    PTSans_400Regular,
    PTSans_700Bold,
    OpenSans_400Regular,
    OpenSans_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={backgroundTexture} style={styles.background}>
          <Header />
          <ScrollView>
            <Text style={styles.title}>Ma wishlist</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.containerBadges}
            >
              {filters}
            </ScrollView>
            <View>
              {wishlist}
              {overlayWishList}
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return { userWishlist: state.wishlist };
}

export default connect(mapStateToProps, null)(BookMarksScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   justifyContent:'center',
    //   alignItems:'center',
  },
  headerBackground: {
    backgroundColor: "#ffffff",
    height: 42,
    width: 375,
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
    textAlign: "center",
    color: "#FF8367",
    fontFamily: "PTSans_400Regular",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 24,
  },
  title: {
    fontFamily: "PTSans_700Bold",
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 26,
    marginTop: 32,
  },
  containerBadges: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // alignItems:'center',
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
  badgeActiveStyle: {
    backgroundColor: "rgba(255, 131, 103, 0.24)",
    borderColor: "#FF8367",
    height: 28,
    borderRadius: 20,
  },
  badgeInactiveStyle: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FF8367",
    height: 28,
    borderRadius: 20,
  },
  cardContainer: {
    backgroundColor: "#FCFCFC",
    borderRadius: 8,
    borderWidth: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,

    elevation: 3,
  },
  cardTitleAndButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitleAndRating: {
    maxWidth: "65%",
  },
  cardButtonsContainerView: {
    marginTop: 8,
    marginRight: -16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cardButtonsContainerStyle: {
    marginRight: 16,
  },
  cardButtons: {
    width: 44,
    height: 44,
    backgroundColor: "#FF8367",
    borderRadius: 40,
  },
  cardTitle: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginEnd: 8,
  },
  cardRating: {
    marginTop: 8,
  },
  cardImage: {
    width: "auto",
    height: 150,
    borderRadius: 8,
  },
  text: {
    color: "#2A2B2A",
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    marginTop: 8,
  },
  overlayCloseButton: {
    width: 44,
    height: 44,
    backgroundColor: "#FF8367",
    borderRadius: 40,
  },
  overlayImage: {
    marginHorizontal: 26,
    marginTop: 32,
    width: "auto",
    height: 150,
    borderRadius: 8,
  },
  overlayTitleH1: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 16,
    marginLeft: 26,
  },
  overlayTitleH2: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 32,
    marginLeft: 26,
  },
  overlayContainerRatingOpen: {
    marginLeft: 26,
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
  },
  overlayContainerOpen: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    alignItems: "center",
  },
  overlayOpen: {
    color: "#1DBC84",
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    fontWeight: "bold",
  },
  overlayClose: {
    color: "#DB331F",
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    fontWeight: "bold",
  },
  overlayContainerAdress: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginHorizontal: 26,
  },
  overlayAdressText: {
    marginLeft: 8,
    color: "rgba(42, 43, 42, 0.4)",
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    marginRight: 26,
  },
  overlayDescription: {
    marginHorizontal: 26,
    marginTop: 8,
    fontFamily: "OpenSans_400Regular",
  },
  overlayMapContainer: {
    marginTop: 16,
    marginHorizontal: 26,
    height: 150,
    borderRadius: 8,
    overflow: "hidden",
  },
  overlayMapStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  overlayContainerHoraires: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 26,
    marginTop: 16,
  },
  overlayContainerJours: {
    marginRight: 26,
  },
  overlayTextJours: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    fontWeight: "bold",
  },
  overlayTextJoursToday: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF8367",
  },
  overlayTextHoraires: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
  },
  overlayTextHorairesToday: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF8367",
  },
  overlayRating: {
    marginLeft: 26,
  },
  overlayListItemContainer: {
    marginHorizontal: 26,
    marginTop: 16,
    marginBottom: 15,
  },
  overlayListItem: {
    paddingLeft: 0,
    paddingRight: 16,
    paddingVertical: 0,
    backgroundColor: "#fff",
  },
  overlayAvatar: {
    width: 44,
    height: 44,
    borderRadius: 50,
  },
  overlayName: {
    fontFamily: "OpenSans_700Bold",
    marginBottom: 6,
  },
  overlayComment: {
    fontFamily: "OpenSans_400Regular",
    marginTop: 8,
  },
  background: {
    height: "100%",
  },
});
