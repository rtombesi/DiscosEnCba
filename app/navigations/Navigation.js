import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import firebase from "firebase/app";
import "firebase/firestore";
import VinilosStack from "./VinilosStack";
import CdsStack from "./CdsStack";
import BarataStack from "./BarataStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((useInfo) => {
      useInfo ? setUser(useInfo) : setUser(null);
    });
  }, []);

  const listeners = ({ navigation, route }) => ({
    tabPress: (e) => {
      e.preventDefault();
      if (!user) {
        Alert.alert(
          "Primero debes Loguearte",
          "Antes que veas los productos, primero nos gustaría conocerte..",
          [
            {
              text: "Ir a Login",
              onPress: () => {
                navigation.navigate("login");
              },
            },
          ],
          { cancelable: false }
        );
      }
      navigation.navigate(route.name);
    },
  });

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="account"
        tabBarOptions={{
          activeBackgroundColor: "#ff7826",
          inactiveTintColor: "#ff7826",
          inactiveBackgroundColor: "#e0e0e0",
          activeTintColor: "#e0e0e0",
          style: { height: 70, borderTopColor: "#ff7826", borderTopWidth: 2 },
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="vinilos"
          component={VinilosStack}
          options={{
            title: "Vinilos",
          }}
          listeners={listeners}
        />
        <Tab.Screen
          name="cds"
          component={CdsStack}
          options={{ title: "Compactos" }}
          listeners={listeners}
        />
        <Tab.Screen
          name="barata"
          component={BarataStack}
          options={{ title: "Baratas" }}
          listeners={listeners}
        />
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ title: "Buscar" }}
          listeners={listeners}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "vinilos":
      iconName = "compass-outline";
      break;
    case "cds":
      iconName = "disc";
      break;
    case "barata":
      iconName = "currency-usd";
      break;
    case "search":
      iconName = "magnify";
      break;
    case "account":
      iconName = "home-outline";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={55} color={color} />
  );
}
