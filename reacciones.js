// reacciones.js

import { db } from "./firebase.js";

import {
    ref,
    onValue,
    runTransaction
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";


// REFERENCIAS

const loveRef = ref(db, "reacciones/love");
const shockRef = ref(db, "reacciones/shock");
const fireRef = ref(db, "reacciones/fire");



// CREAR VALORES INICIALES

function inicializarReaccion(referencia, valorInicial){

    runTransaction(referencia, (valor)=>{

        if(valor === null){

            return valorInicial;

        }

        return valor;

    });

}


inicializarReaccion(loveRef,250000);

inicializarReaccion(shockRef,150000);

inicializarReaccion(fireRef,87000);




// FORMATO

function formato(numero){

    return Number(numero)
    .toLocaleString("es-UY");

}




// MOSTRAR DATOS

onValue(loveRef,(snapshot)=>{

    const elemento =
    document.getElementById("count-love");

    if(elemento){

        elemento.innerHTML =
        formato(snapshot.val() || 250000);

    }

});



onValue(shockRef,(snapshot)=>{

    const elemento =
    document.getElementById("count-shock");

    if(elemento){

        elemento.innerHTML =
        formato(snapshot.val() || 150000);

    }

});



onValue(fireRef,(snapshot)=>{

    const elemento =
    document.getElementById("count-fire");

    if(elemento){

        elemento.innerHTML =
        formato(snapshot.val() || 87000);

    }

});




// BOTONES HTML

window.addReaction = function(tipo){


const referencia =
ref(db,"reacciones/"+tipo);



runTransaction(referencia,(valor)=>{


return (valor || 0) + 1;


});


};
