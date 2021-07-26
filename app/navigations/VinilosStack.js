import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Vinilos from "../screens/Vinilos/Vinilos";
import AddVinilos from "../screens/Vinilos/AddVinilos";
import Vinilo from "../screens/Vinilos/Vinilo";
import AddReviewVinilo from "../screens/Vinilos/AddReviewVinilo";
import Logo from "./Logo";

const Stack = createStackNavigator();

export default function VinilosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="vinilos"
        component={Vinilos}
        options={{
          title: "Vinilos",
          headerRight: (props) => <Logo {...props} />,
          headerStyle: { backgroundColor: "#fff3ec" },
        }}
      />
      <Stack.Screen
        name="add-vinilo"
        component={AddVinilos}
        options={{
          title: "Agregar nuevo vinilo",
          headerRight: (props) => <Logo {...props} />,
          headerStyle: { backgroundColor: "#fff3ec" },
        }}
      />
      <Stack.Screen
        name="vinilo"
        component={Vinilo}
        options={{
          headerRight: (props) => <Logo {...props} />,
          headerStyle: { backgroundColor: "#fff3ec" },
        }}
      />
      <Stack.Screen
        name="add-review-vinilo"
        component={AddReviewVinilo}
        options={{
          title: "Agrega tu comentario",
          headerRight: (props) => <Logo {...props} />,
          headerStyle: { backgroundColor: "#fff3ec" },
        }}
      />
    </Stack.Navigator>
  );
}
