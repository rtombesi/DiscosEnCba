import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { map, size, filter } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import uuid from "random-uuid-v4";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const widthScreen = Dimensions.get("window").width;

export default function AddBarataForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [barataName, setBarataName] = useState("");
  const [barataAutor, setBarataAutor] = useState("");
  const [barataDescription, setBarataDescription] = useState("");
  const [barataPrice, setBarataPrice] = useState("");
  const [imageSelected, setImageSelected] = useState([]);

  const addBarata = () => {
    if (!barataName || !barataAutor || !barataDescription || !barataPrice) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (size(imageSelected) === 0) {
      toastRef.current.show("La barata debe tener al menos una foto");
    } else {
      setIsLoading(true);
      uploadImageStorage().then((response) => {
        db.collection("baratas")
          .add({
            type: "barata",
            name: barataName,
            author: barataAutor,
            description: barataDescription,
            price: barataPrice,
            images: response,
            rating: 0,
            ratingTotal: 0,
            quantityVoting: 0,
            createAt: new Date(),
            createBy: firebase.auth().currentUser.uid,
          })
          .then(() => {
            setIsLoading(false);
            navigation.navigate("baratas");
          })
          .catch(() => {
            setIsLoading(false);
            toastRef.current.show(
              "Error al subir la Barata, intente mas tarde"
            );
          });
      });
    }
  };

  const uploadImageStorage = async () => {
    const imageBlob = [];

    await Promise.all(
      map(imageSelected, async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase.storage().ref("baratas").child(uuid());
        await ref.put(blob).then(async (result) => {
          await firebase
            .storage()
            .ref(`baratas/${result.metadata.name}`)
            .getDownloadURL()
            .then((photoUrl) => {
              imageBlob.push(photoUrl);
            });
        });
      })
    );
    return imageBlob;
  };

  return (
    <ScrollView style={styles.scrollView}>
      <ImagenBarata photoBarata={imageSelected[0]} />
      <FormAdd
        setBarataName={setBarataName}
        setBarataAutor={setBarataAutor}
        setBarataDescription={setBarataDescription}
        setBarataPrice={setBarataPrice}
      />
      <UpLoadImage
        toastRef={toastRef}
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
      />
      <Button
        title="Crear Nueva Barata"
        onPress={addBarata}
        buttonStyle={styles.btnAddBarata}
      />
    </ScrollView>
  );
}

function ImagenBarata(props) {
  const { photoBarata } = props;

  return (
    <View style={styles.viewPhoto}>
      <Image
        source={
          photoBarata
            ? { uri: photoBarata }
            : require("../../../assets/img/no-image.png")
        }
        style={{ width: widthScreen, height: 200 }}
      />
    </View>
  );
}

function FormAdd(props) {
  const {
    setBarataName,
    setBarataAutor,
    setBarataDescription,
    setBarataPrice,
  } = props;
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre de la Barata"
        containerStyle={styles.input}
        onChange={(e) => setBarataName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Nombres de Autor e Intérprete"
        containerStyle={styles.input}
        onChange={(e) => setBarataAutor(e.nativeEvent.text)}
      />
      <Input
        placeholder="Descripción de la Barata"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setBarataDescription(e.nativeEvent.text)}
      />
      <Input
        placeholder="Precio de la Barata"
        inputContainerStyle={styles.input}
        onChange={(e) => setBarataPrice(e.nativeEvent.text)}
      />
    </View>
  );
}

function UpLoadImage(props) {
  const { toastRef, imageSelected, setImageSelected } = props;

  const imageSelect = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (resultPermissions === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la galería, si lo has rechazado debes ir a Ajustes y activarlos manualmente",
        4000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show(
          "Has cerrado sin seleccionar ninuna imagen de la galeria",
          3000
        );
      } else {
        setImageSelected([...imageSelected, result.uri]);
      }
    }
  };

  const removeImage = (image) => {
    Alert.alert(
      "Borrar Imagen",
      "¿Estas seguro que deseas eliminar la imagen?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            setImageSelected(
              filter(imageSelected, (imageUrl) => imageUrl !== image)
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viewImage}>
      {size(imageSelected) < 4 && (
        <Icon
          type="material-community"
          name="camera-plus"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}
      {map(imageSelected, (imageBarata, index) => (
        <Avatar
          key={index}
          style={styles.miniatureStyle}
          source={{ uri: imageBarata }}
          onPress={() => removeImage(imageBarata)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 70,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnAddBarata: {
    backgroundColor: "#ea4d14fa",
    margin: 20,
  },
  viewImage: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignContent: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 60,
    height: 60,
    marginRight: 5,
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
});
