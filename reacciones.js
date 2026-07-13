// reacciones.js

import { db } from "./firebase.js";

import {
    ref,
    onValue,
    runTransaction,
    set
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";



// REFERENCIAS

const loveRef =
ref(db,"reacciones/love");


const shockRef =
ref(db,"reacciones/shock");


const fireRef =
ref(db,"reacciones/fire");




// CREAR VALORES INICIALES SI NO EXISTEN


function inicializarReaccion(referencia, valorInicial){


runTransaction(
referencia,
(valor)=>{


if(valor === null){

    return valorInicial;

}


return valor;


});


}



inicializarReaccion(
loveRef,
250000
);


inicializarReaccion(
shockRef,
150000
);


inicializarReaccion(
fireRef,
87000
);





// FORMATO DE NÚMEROS


function formato(numero){

return Number(numero)
.toLocaleString("es-UY");

}





// MOSTRAR CONTADORES


onValue(
loveRef,
(snapshot)=>{


document.getElementById("count-love").innerHTML =

formato(snapshot.val() || 250000);


});





onValue(
shockRef,
(snapshot)=>{


document.getElementById("count-shock").innerHTML =

formato(snapshot.val() || 150000);


});





onValue(
fireRef,
(snapshot)=>{


document.getElementById("count-fire").innerHTML =

formato(snapshot.val() || 87000);


});







// FUNCIÓN GLOBAL PARA LOS BOTONES HTML


window.addReaction = function(tipo){



const referencia =

ref(db,"reacciones/"+tipo);





runTransaction(
referencia,
(valorActual)=>{


return (valorActual || 0) + 1;


});


};
