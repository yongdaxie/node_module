// Importer les fonctions necessaire via SKD
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import { getDatabase, ref, set, get , child} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";


// C'est une configuration FireBase
const firebaseConfig = {
  apiKey: "AIzaSyABGVVUqDXG8mE9Xp1vPEimbeSlaSlDg00",
  authDomain: "connect-the-dotte.firebaseapp.com",
  databaseURL: "https://connect-the-dotte-default-rtdb.firebaseio.com",
  projectId: "connect-the-dotte",
  storageBucket: "connect-the-dotte.appspot.com",
  messagingSenderId: "538811209949",
  appId: "1:538811209949:web:c2ca6f2e69ee9b0fd9a334",
  measurementId: "G-W2K8FML4N6"
};

// Initialisation
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


// Enregistre le nom de l'utilisateur dans le "realtime databse" de FireBase
export function enregistrerNom(nom) {
  set(ref(database, 'nom/' + nom), {
    username: nom
  });
}
