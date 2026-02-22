import { db } from "./firebase.js";
import { collection, getDocs } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadEvents() {
  const container = document.getElementById("events");
  container.innerHTML = "";

  const snapshot = await getDocs(collection(db, "events"));

  snapshot.forEach((doc) => {
    const data = doc.data();

    container.innerHTML += `
      <div class="card">
        <h4>${data.title}</h4>
        <p>${data.date}</p>
        <p>${data.location}</p>
        <p>${data.description}</p>
      </div>
    `;
  });
}

loadEvents();
