import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListBaratas(props) {
  const { baratas, handleLoadMore, isLoading } = props;
  const navigation = useNavigation();
  return (
    <View>
      {size(baratas) > 0 ? (
        <FlatList
          data={baratas}
          renderItem={(barata) => (
            <Barata barata={barata} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderBaratas}>
          <ActivityIndicator size="large" />
          <Text>Cargando Barata</Text>
        </View>
      )}
    </View>
  );
}

function Barata(props) {
  const { barata, navigation } = props;
  const { id, images, name, author, description, price } = barata.item;
  const imageBarata = images[0];

  const goBarata = () => {
    navigation.navigate("barata", {
      id,
      name,
    });
  };

  return (
    <TouchableOpacity onPress={goBarata}>
      <View style={styles.viewBarata}>
        <View style={styles.viewBarataImage}>
          <Image
            resizeMode="cover"
            placeholderContent={<ActivityIndicator color="fff" />}
            source={
              imageBarata
                ? { uri: imageBarata }
                : require("../../../assets/img/no-image.png")
            }
            style={styles.imageBarata}
          />
        </View>
        <View>
          <Text style={styles.barataName}>{name}</Text>
          <Text style={styles.barataAuthor}>{author}</Text>
          <Text style={styles.barataDescription}>
            {description.substr(0, 60)}...
          </Text>
          <Text style={styles.barataPrice}>{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loaderBaratas}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundBaratas}>
        <Text>No hay mas Baratas por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderBaratas: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewBarata: {
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  viewBarataImage: {
    marginRight: 5,
  },
  imageBarata: {
    width: 160,
    height: 130,
  },
  barataName: {
    fontWeight: "bold",
  },
  barataAuthor: {
    paddingTop: 2,
    color: "grey",
  },
  barataDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  barataPrice: {
    paddingTop: 5,
    color: "#ea4d14fa",
    fontSize: 20,
    fontWeight: "bold",
  },
  notFoundBaratas: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
