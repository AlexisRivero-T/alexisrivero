// reacciones.js
console.log("REACCIONES CARGADO");
import { db } from "./firebase.js";
console.log("REACCIONES.JS CARGADO");
console.log("DB:", db);
import {
    ref,
    onValue,
    runTransaction
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";



// REFERENCIAS FIREBASE

const loveRef =
ref(db,"reacciones/love");


const shockRef =
ref(db,"reacciones/shock");


const fireRef =
ref(db,"reacciones/fire");




// INICIALIZAR CONTADORES

function inicializar(referencia, numeroInicial){

    runTransaction(referencia,(valor)=>{

        if(valor === null){

            return numeroInicial;

        }

        return valor;

    });

}


inicializar(loveRef,250000);

inicializar(shockRef,150000);

inicializar(fireRef,87000);




// FORMATO

function formato(numero){

    return Number(numero)
    .toLocaleString("es-UY");

}





// MOSTRAR EN PANTALLA

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






// CLIC EN REACCIONES


document.querySelectorAll("[data-reaction]")
.forEach((boton)=>{


    boton.addEventListener("click",()=>{


        const tipo =
        boton.dataset.reaction;



        const referencia =
        ref(db,"reacciones/"+tipo);



        runTransaction(
        referencia,
        (valorActual)=>{


            return (valorActual || 0) + 1;


        });


    });


});
