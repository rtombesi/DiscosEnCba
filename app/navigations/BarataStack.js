import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Baratas from "../screens/Baratas/Baratas";
import AddBaratas from "../screens/Baratas/AddBaratas";
import Barata from "../screens/Baratas/Barata";
import AddReviewBarata from "../screens/Baratas/AddReviewBarata";
import Logo from "./Logo";

const Stack = createStackNavigator();

export default function BarataStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="baratas"
        component={Baratas}
        options={{
          title: "Ofertas de Vinilos y Cds",
          headerRight: (props) => <Logo {...props} />,
          headerStyle: { backgroundColor: "#fff3ec" },
        }}
      />
      <Stack.Screen
        name="add-barata"
        component={AddBaratas}
        options={{
          title: "Agregar nueva Barata",
          headerRight: (props) => <Logo {...props} />,
          headerStyle: { backgroundColor: "#fff3ec" },
        }}
      />
      <Stack.Screen
        name="barata"
        component={Barata}
        options={{
          headerRight: (props) => <Logo {...props} />,
          headerStyle: { backgroundColor: "#fff3ec" },
        }}
      />
      <Stack.Screen
        name="add-review-barata"
        component={AddReviewBarata}
        options={{
          title: "Agrega tu comentario",
          headerRight: (props) => <Logo {...props} />,
          headerStyle: { backgroundColor: "#fff3ec" },
        }}
      />
    </Stack.Navigator>
  );
}
