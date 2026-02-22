import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const allowedEmails = [
  "lincet@gvsu.edu",
  "bakereri@gvsu.edu",
  "millal3@gvsu.edu",
  "bardwelb@gvsu.edu",
  "guerraft@gvsu.edu",
  "toddph@gvsu.edu",
  "galugur@mail.gvsu.edu"
];

window.login = async function() {

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (!allowedEmails.includes(email)) {
    error.innerText = "Access Denied.";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "assistant.html";
  } catch {
    error.innerText = "Invalid email or password.";
  }
};
