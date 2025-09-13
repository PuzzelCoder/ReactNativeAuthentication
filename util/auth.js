import axios from "axios";

const API_KEY = "AIzaSyAbaW-ALbhJq_muIU3_34nEryxYunksQG4";

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}
export function loginUser(email, password) {
  return authenticate("signInWithPassword", email, password);
}

async function authenticate(mode, userEmail, userPassword) {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:" +
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
