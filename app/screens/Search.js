import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { FireSQL } from "firesql";
import firebase from "firebase/app";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Search(props) {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (search) {
      fireSQL
        .query(
          `SELECT * FROM vinilos WHERE name LIKE '${search}%' OR author LIKE '${search}%'
           UNION SELECT * FROM cds WHERE name LIKE '${search}%' OR author LIKE '${search}%'
           UNION SELECT * FROM baratas WHERE name LIKE '${search}%' OR author LIKE '${search}%'`
        )
        .then((response) => {
          setProducts(response);
        });
    }
  }, [search]);

  return (
    <View>
      <SearchBar
        placeholder="Busca por Nombre o Autor..."
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.inputContainerSearch}
      />
      {products.length === 0 ? (
        <NoFoundProducts />
      ) : (
        <FlatList
          data={products}
          renderItem={(product) => (
            <Products product={product} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

function NoFoundProducts() {
  return (
    <View style={styles.notFoundProducts}>
      <Image
        source={require("../../assets/img/no-result.png")}
        resizeMode="contain"
        style={{ width: 300, height: 200 }}
      />
    </View>
  );
}

function Products(props) {
  const { product, navigation } = props;
  const { id, type, name, images } = product.item;

  const goToProduct = () => {
    if (type === "vinilo")
      navigation.navigate("vinilos", {
        screen: "vinilo",
        params: { id, name },
      });
    else if (type === "cd")
      navigation.navigate("cds", {
        screen: "cd",
        params: { id, name },
      });
    else
      navigation.navigate("barata", {
        screen: "barata",
        params: { id, name },
      });
  };

  return (
    <ListItem
      title={name}
      leftAvatar={{
        source: images[0]
          ? { uri: images[0] }
          : require("../../assets/img/no-image.png"),
      }}
      rightIcon={
        <Icon
          type="material-community"
          name="chevron-right"
          color="#ea4d14fa"
        />
      }
      onPress={goToProduct}
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 25,
    backgroundColor: "#ff7826",
  },
  inputContainerSearch: {
    backgroundColor: "white",
  },
  notFoundVinilos: {
    flex: 1,
    alignItems: "center",
  },
});
