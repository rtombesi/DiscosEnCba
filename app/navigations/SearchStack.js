import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/Search";
import Logo from "./Logo";

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          title: "Buscador de Discos",
          headerRight: (props) => <Logo {...props} />,
          headerStyle: { backgroundColor: "#fff3ec" },
        }}
      />
    </Stack.Navigator>
  );
}
