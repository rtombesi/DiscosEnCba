import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import Loading from "../../components/Loading";
import Carousel from "../../components/Carousel";
import { useFocusEffect } from "@react-navigation/native";
import { Rating } from "react-native-elements";
import ListReviewsBaratas from "../../components/Baratas/ListReviewsBaratas";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function Barata(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [barata, setBarata] = useState(null);
  const [rating, setRating] = useState(0);

  navigation.setOptions({ title: name });

  useFocusEffect(
    useCallback(() => {
      db.collection("baratas")
        .doc(id)
        .get()
        .then((response) => {
          const data = response.data();
          data.id = response.id;
          setBarata(data);
          setRating(data.rating);
        });
    }, [])
  );

  if (!barata) return <Loading isVisible={true} text="Cargando..." />;

  return (
    <ScrollView style={styles.viewBody}>
      <Carousel arrayImages={barata.images} height={250} width={screenWidth} />
      <TitleBarata
        name={barata.name}
        author={barata.author}
        description={barata.description}
        price={barata.price}
        rating={rating}
      />
      <ListReviewsBaratas navigation={navigation} idBarata={barata.id} />
    </ScrollView>
  );
}

function TitleBarata(props) {
  const { name, author, description, price, rating } = props;

  return (
    <View style={styles.viewBarataTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameBarata}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.authorBarata}>{author}</Text>
        <Text style={styles.priceBarata}>{price}</Text>
      </View>
      <Text style={styles.descriptionBarata}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewBarataTitle: {
    padding: 15,
  },
  nameBarata: {
    fontSize: 25,
    fontWeight: "bold",
  },
  authorBarata: {
    fontSize: 20,
    fontWeight: "normal",
  },
  priceBarata: {
    position: "absolute",
    right: 0,
    fontSize: 22,
    fontWeight: "bold",
  },
  descriptionBarata: {
    marginTop: 5,
    color: "grey",
    fontSize: 15,
  },
  rating: {
    position: "absolute",
    right: 0,
  },
});
