import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const allowedEmails = [
  "lincet@gvsu.edu",
  "bakereri@gvsu.edu",
  "millal3@gvsu.edu",
  "bardwelb@gvsu.edu",
  "guerraft@gvsu.edu",
  "toddph@gvsu.edu",
  "galugur@mail.gvsu.edu"
];

onAuthStateChanged(auth, (user) => {
  if (!user || !allowedEmails.includes(user.email)) {
    window.location.href = "login.html";
  }
});

window.logout = function() {
  signOut(auth);
};

window.createEvent = async function() {

  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;
  const description = document.getElementById("description").value;

  await addDoc(collection(db, "events"), {
    title,
    date,
    location,
    description
  });

  alert("Event Added!");
  loadEvents();
};

async function loadEvents() {

  const list = document.getElementById("event-list");
  list.innerHTML = "";

  const snapshot = await getDocs(collection(db, "events"));

  snapshot.forEach((doc) => {
    const data = doc.data();
    list.innerHTML += `<div class="card">${data.title} - ${data.date}</div>`;
  });
}

loadEvents();
