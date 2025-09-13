import AuthContent from "../components/Auth/AuthContent";
import { useContext, useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { loginUser } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../util/auth-context";
function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  async function loginHandler({ email, password }) {
    try {
      setIsLoading(true);
      console.log("before LoginUser");
      const token = await loginUser(email, password);
      console.log("after LoginUser");
      authContext.authenticate(token);
    } catch (error) {
      console.log(error);
      Alert.alert("Authentication Failed", " Could not Sign In You");
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingOverlay message="Logging you in..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
