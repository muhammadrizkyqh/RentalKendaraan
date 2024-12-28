import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import AdminLogin from "./src/screens/AdminLogin";
import AdminRegister from "./src/screens/AdminRegister";
import AdminDashboard from "./src/screens/AdminDashboard";
import ManageVehicles from "./src/screens/ManageVehicles";
import ManageOrders from "./src/screens/ManageOrders";
import OrderDetail from "./src/screens/OrderDetail";
import OrderHistory from "./src/screens/OrderHistory";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AdminLogin">
          <Stack.Screen
            name="AdminLogin"
            component={AdminLogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminRegister"
            component={AdminRegister}
            options={{ headerShown: false }}
          />
          <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageVehicles"
          component={ManageVehicles}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageOrders"
          component={ManageOrders}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={{ headerShown: false }}
        />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;