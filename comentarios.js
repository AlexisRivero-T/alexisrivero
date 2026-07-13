// comentarios.js

import { db } from "./firebase.js";

import {
    ref,
    push,
    set,
    onValue,
    query,
    orderByChild
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";



// REFERENCIAS FIREBASE

const comentariosRef = ref(db, "comentarios");



// ELEMENTOS HTML

const formulario =
document.getElementById("formComentario");


const lista =
document.getElementById("listaComentarios");


const contador =
document.getElementById("total-comments-counter");




// MOSTRAR COMENTARIOS EN TIEMPO REAL

const comentariosOrdenados =
query(
    comentariosRef,
    orderByChild("fecha")
);



onValue(comentariosOrdenados, (snapshot)=>{


    lista.innerHTML="";


    let cantidad=0;



    snapshot.forEach((item)=>{


        cantidad++;


        const comentario =
        item.val();



        const tarjeta = document.createElement("div");


        tarjeta.className =
        "bg-slate-900 border border-slate-700 rounded-xl p-4";



        tarjeta.innerHTML = `

        <div class="flex justify-between items-center">


            <span class="text-amber-400 font-bold">

                ${comentario.nombre}

            </span>


            <span class="text-gray-500 text-xs">

                ${comentario.fecha}

            </span>


        </div>



        <p class="mt-3 text-gray-300">

            ${comentario.texto}

        </p>


        `;



        lista.appendChild(tarjeta);



    });



    contador.innerHTML = cantidad;



});





// GUARDAR NUEVO COMENTARIO


formulario.addEventListener(
"submit",
(e)=>{


e.preventDefault();



const nombre =
document.getElementById("nombre").value.trim();



const texto =
document.getElementById("comentario").value.trim();





if(!nombre || !texto){

    return;

}





const nuevoComentario =
push(comentariosRef);





set(nuevoComentario,{


nombre:nombre,


texto:texto,


fecha:
Date.now()



});





formulario.reset();



});
