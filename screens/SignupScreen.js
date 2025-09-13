import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../util/auth-context";

function SignupScreen() {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  async function SignUpHandler({ email, password }) {
    try {
      setIsLoading(true);
      console.log("before CreateUser");
      const token = await createUser(email, password);
      console.log("after CreateUser");
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert("Authentication Failed", "Could not SignUp you.");
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingOverlay message="Creating User..." />;
  }
  return <AuthContent onAuthenticate={SignUpHandler} />;
}

export default SignupScreen;
