import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  //   useEffect(() => {
  //     async function fetchToken() {
  //       const storedToken = await AsyncStorage.getItem("token");
  //       if (storedToken) {
  //         console.log("token was stored");
  //         authenticate(storedToken);
  //       } else {
  //         console.log("token was not stored");
  //       }
  //     }
  //     fetchToken();
  //   }, []);

  function authenticate(token) {
    setAuthToken(token);
    console.log("authenticate token is present");
    AsyncStorage.setItem("token", token);
  }
  function logout() {
    setAuthToken(null);
    console.log("Token is removed");
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
