import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import firebase from "firebase/app";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firestore";
import ListBaratas from "../../components/Baratas/ListBaratas";

const db = firebase.firestore(firebaseApp);
const db1 = firebase.firestore(firebaseApp);

export default function Baratas(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [baratas, setBaratas] = useState([]);
  const [totalBaratas, settotalBaratas] = useState(0);
  const [startBaratas, setStartBaratas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const limitBaratas = 10;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((useInfo) => {
      const useradmin = [];
      db1
        .collection("useradmin")
        .get()
        .then((response) => {
          response.forEach((doc) => {
            const usradmin = doc.data();
            useradmin.push(usradmin);
          });
          useradmin.forEach((element) => {
            if (element.useruid == useInfo.uid) {
              setUser(useInfo);
            } else {
              setUser(null);
            }
          });
        });
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      db.collection("baratas")
        .get()
        .then((snap) => {
          settotalBaratas(snap.size);
        });
      const resultBaratas = [];

      db.collection("baratas")
        .orderBy("createAt", "desc")
        .limit(limitBaratas)
        .get()
        .then((response) => {
          setStartBaratas(response.docs[response.docs.length - 1]);
          response.forEach((doc) => {
            const barata = doc.data();
            barata.id = doc.id;
            resultBaratas.push(barata);
          });
          setBaratas(resultBaratas);
        });
    }, [])
  );

  const handleLoadMore = () => {
    const resultBaratas = [];
    baratas.length < totalBaratas && setIsLoading(true);

    db.collection("baratas")
      .orderBy("createAt", "desc")
      .startAfter(startBaratas.data().createAt)
      .limit(limitBaratas)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartBaratas(response.docs[response.docs.length - 1]);
        } else {
          setIsLoading(false);
        }

        response.forEach((doc) => {
          const barata = doc.data();
          barata.id = doc.id;
          resultBaratas.push(barata);
        });

        setBaratas([...baratas, ...resultBaratas]);
      });
  };

  return (
    <View style={styles.viewBody}>
      <ListBaratas
        baratas={baratas}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
      />
      {user && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#ff7826"
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("add-barata")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
  },
});
