import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import IconButton from "./components/ui/IconButton";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import { useContext, useState, useEffect } from "react";
import AuthContextProvider, { AuthContext } from "./util/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authContext = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            size={24}
            color={tintColor}
            onPress={authContext.logout}
          />
        ),
      })}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authContext = useContext(AuthContext);
  return (
    <NavigationContainer>
      {authContext.isAuthenticated && <AuthenticatedStack />}
      {!authContext.isAuthenticated && <AuthStack />}
    </NavigationContainer>
  );
}

function Root() {
  const authContext = useContext(AuthContext);
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      setTimeout(() => {
        if (storedToken) {
          console.log("App token was stored");

          authContext.authenticate(storedToken);
        } else {
          console.log("App token was not stored");
        }
        setIsTryingLogin(false);
      }, 5000);
    }
    fetchToken();
  }, []);

  useEffect(() => {
    if (!isTryingLogin) {
      SplashScreen.hideAsync();
    }
  }, [isTryingLogin]);

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
