// firebase.js

// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { 
    getDatabase 
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

import { 
    getAuth, 
    signInAnonymously 
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";



// CONFIGURACIÓN FIREBASE

const firebaseConfig = {

    apiKey: "AIzaSyAzFInw9XScGWLMaEMCsQ3rWv8PG5ozGQ8",

    authDomain: "alexis-rivero.firebaseapp.com",

    databaseURL:
    "https://alexis-rivero-default-rtdb.firebaseio.com",

    projectId: "alexis-rivero",

    storageBucket:
    "alexis-rivero.firebasestorage.app",

    messagingSenderId:
    "813915112924",

    appId:
    "1:813915112924:web:68d85b1f4677cce9cb7b19"

};




// INICIALIZAR FIREBASE


export const app = initializeApp(firebaseConfig);




// BASE DE DATOS REALTIME


export const db = getDatabase(app);




// AUTENTICACIÓN ANÓNIMA


const auth = getAuth(app);



signInAnonymously(auth)

.then(()=>{

    console.log(
        "Firebase conectado correctamente"
    );

})

.catch((error)=>{


    console.error(
        "Error de autenticación Firebase:",
        error
    );


});
