import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/PortadaDisco1.jpg")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Descubrí tu perfil en Discos-Cba</Text>
      <Text style={styles.comentario}>
        ¿ Cómo calificarías tu mejor Vinilo o Compacto? Busca y visualiza los
        mejores Discos y CDs de una manera sencilla, vota cual te ha gustado más
        y comenta como fué tu experiencia
      </Text>
      <View style={styles.viewButton}>
        <Button
          title="Accedé a tu perfil"
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          onPress={() => navigation.navigate("login")}
        />
      </View>
      <View style={styles.contentContact}>
        <Icon
          type="material-community"
          name="account"
          iconStyle={styles.iconLeft}
        />
        <Text style={styles.contactStyle}>Martin Carrizo</Text>
      </View>
      <View style={styles.contentContact}>
        <Icon
          type="material-community"
          name="email"
          iconStyle={styles.iconLeft}
        />
        <Text style={styles.contactStyle}>discosencba2020@gmail.com</Text>
      </View>
      <View style={styles.contentContact}>
        <Icon
          type="material-community"
          name="whatsapp"
          iconStyle={styles.iconLeft}
        />
        <Text style={styles.contactStyle}> 54 9 3516240619</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    marginTop: 20,
    height: 190,
    width: "99%",
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  comentario: {
    textAlign: "center",
    marginBottom: 20,
  },
  viewButton: {
    flex: 1,
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: "#ff7826",
    borderRadius: 6,
  },
  buttonContainer: {
    width: "100%",
  },
  contactStyle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#c1c1c1",
  },
  contentContact: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  iconLeft: {
    color: "#c1c1c1",
  },
});
