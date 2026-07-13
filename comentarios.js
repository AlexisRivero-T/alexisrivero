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
const formulario = document.getElementById("formComentario");
const lista = document.getElementById("listaComentarios");
const contador = document.getElementById("total-comments-counter");

// --- FUNCIÓN DE INYECCIÓN MASIVA (Solo ejecutar una vez) ---
const generarComentariosIniciales = () => {
    const nombres = ["Ana", "Carlos", "Elena", "Javier", "Sofía", "Diego", "Valentina", "Mateo", "Lucía", "Gabriel"];
    const textos = [
        "¡Excelente contenido, me ayudó muchísimo!",
        "Increíble explicación, gracias por compartir.",
        "Muy claro todo, espero el próximo video.",
        "Me encanta cómo abordas estos temas históricos.",
        "Súper profesional, sigan así.",
        "La calidad de edición es impresionante.",
        "Aprendí algo nuevo hoy, ¡gracias!",
        "Me suscribo ahora mismo, contenido de gran valor.",
        "Excelente trabajo de investigación.",
        "¡Qué buena forma de explicar la historia!"
    ];

    for (let i = 0; i < 300; i++) {
        const nuevoComentario = push(comentariosRef);
        const fechaAleatoria = Date.now() - (Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000));
        
        set(nuevoComentario, {
            nombre: nombres[Math.floor(Math.random() * nombres.length)],
            texto: textos[Math.floor(Math.random() * textos.length)],
            fecha: fechaAleatoria
        });
    }
    console.log("300 comentarios generados.");
};

// Descomenta la línea de abajo solo la primera vez que cargues la app para poblar la BD
generarComentariosIniciales();

// MOSTRAR COMENTARIOS EN TIEMPO REAL
const comentariosOrdenados = query(comentariosRef, orderByChild("fecha"));

onValue(comentariosOrdenados, (snapshot) => {
    lista.innerHTML = "";
    let cantidad = 0;

    snapshot.forEach((item) => {
        cantidad++;
        const comentario = item.val();
        
        // Convertimos el timestamp a un formato legible
        const fechaLegible = new Date(comentario.fecha).toLocaleString();

        const tarjeta = document.createElement("div");
        tarjeta.className = "bg-slate-900 border border-slate-700 rounded-xl p-4";

        tarjeta.innerHTML = `
        <div class="flex justify-between items-center">
            <span class="text-amber-400 font-bold">${comentario.nombre}</span>
            <span class="text-gray-500 text-xs">${fechaLegible}</span>
        </div>
        <p class="mt-3 text-gray-300">${comentario.texto}</p>
        `;

        lista.appendChild(tarjeta);
    });

    contador.innerHTML = cantidad;
});

// GUARDAR NUEVO COMENTARIO
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const texto = document.getElementById("comentario").value.trim();

    if (!nombre || !texto) return;

    const nuevoComentario = push(comentariosRef);

    set(nuevoComentario, {
        nombre: nombre,
        texto: texto,
        fecha: Date.now()
    });

    formulario.reset();
});
