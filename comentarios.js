import { db } from "./firebase.js";

import {
  ref,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

const lista = document.getElementById("listaComentarios");
const formulario = document.getElementById("formComentario");

if (formulario) {

formulario.addEventListener("submit", function(e){

e.preventDefault();

const nombre = document.getElementById("nombre").value.trim();

const comentario = document.getElementById("comentario").value.trim();

if(nombre==="" || comentario==="") return;

push(ref(db,"comentarios"),{

nombre:nombre,

comentario:comentario,

fecha:Date.now()

});

formulario.reset();

});

}

onChildAdded(ref(db,"comentarios"),(snap)=>{

const datos=snap.val();

const div=document.createElement("div");

div.className="comentario";

div.innerHTML=`
<h4>${datos.nombre}</h4>
<p>${datos.comentario}</p>
`;

lista.prepend(div);

});
