import { db } from "./firebase.js";

import {
  ref,
  runTransaction,
  onValue
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

window.addReaction = function(tipo){

    const contador = ref(db,"reacciones/"+tipo);

    runTransaction(contador,(valor)=>{
        return (valor || 0) + 1;
    });

}

["love","shock","fire"].forEach(tipo=>{

    onValue(ref(db,"reacciones/"+tipo),(snap)=>{

        const valor=snap.val()||0;

        document.getElementById("count-"+tipo).innerText=valor.toLocaleString();

    });

});
