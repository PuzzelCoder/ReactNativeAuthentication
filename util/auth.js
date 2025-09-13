import axios from "axios";

const API_KEY = <User Firebase webApi Key>

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}
export function loginUser(email, password) {
  return authenticate("signInWithPassword", email, password);
}

async function authenticate(mode, userEmail, userPassword) {
  const url = <Firebase realtime database link>
    +
    mode +
    "?key=" +
    API_KEY;

  const response = await axios.post(url, {
    email: userEmail,
    password: userPassword, // for firebase your pasword should be more than 7 characters.
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}
