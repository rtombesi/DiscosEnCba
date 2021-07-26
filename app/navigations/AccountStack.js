import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";
import Logo from "./Logo";

const Stack = createStackNavigator();

export default function VinilosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{
          title: "Mi Cuenta",
          headerRight: (props) => <Logo {...props} />,
          headerStyle: { backgroundColor: "#fff3ec" },
        }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          title: "Iniciar Sesión",
          headerRight: (props) => <Logo {...props} />,
          headerStyle: { backgroundColor: "#fff3ec" },
        }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{
          title: "Registro",
          headerRight: (props) => <Logo {...props} />,
          headerStyle: { backgroundColor: "#fff3ec" },
        }}
      />
    </Stack.Navigator>
  );
}
