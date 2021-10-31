
import{initializeApp} from "firebase/app";
import{getDatabase, ref, push, set,get} from "firebase/database";

import {getFirebaseConfig} from "./firebase-config";


//Inicializar el Firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);



//Metodo registrar candidato
function candRegister (candidate){

    //Obtener base de datos
    const db = getDatabase();
    const dbRef = ref(db, 'candidates/' + candidate.id1);
    //Obtener una sola vez el dato de la posicion del id actual
    get(dbRef).then ((snapshot) => {
        const data = snapshot.val();
        
        //Verifica que el ID sea efectivamente único
       if(data===null){
        set(dbRef, candidate);
       }else{
        
        alert("El ID ya se encuentra registrado");
       }
      });
 

}


//Metodo para obtener la lista de candidatos
function getCand(){
    const db = getDatabase();
    const dbRef = ref(db, 'candidates');

    //Obtener una sola vez los datos de candidatos
    get(dbRef).then((snapshot)=>{
        const data = snapshot.val();
        if(data===null){
            alert("No hay candidatos registrados aún");    
        }else{
            currentList(data);
        }
      
    });
}
//Metodo para obtener la lista de votos (y candidatos)
function getVotes(){
    const db = getDatabase();
    const voteRef = ref(db, 'votes');
    const candRef = ref(db, 'candidates');
    //Obtener una sola vez los datos de votos
    get(voteRef).then((snapshot)=>{
        const voteData = snapshot.val();
        if(voteData===null){
            alert("No hay votos registrados aún");    
        }else{
            const voteTotal = Object.keys(voteData).length;
       
        //Obtener una sola vez los datos de candidatos
        get(candRef).then((snapshot)=>{
        const candData = snapshot.val();
        assignVotes(candData,voteData,voteTotal);
        });
            
        }
        
    });
}
//Asigna los votos segun el ID
function assignVotes(candSnap,voteSnap,total){
   let text = "";
//Doble for que va comparando las IDs de los votos con la de los candidatos, y les suma votos cuando estas coinciden
   Object.keys(candSnap).forEach((key, index)=>{
    let votesIndividual = 0;
    Object.keys(voteSnap).forEach((keyV, indexV)=>{
        if (voteSnap[keyV].id2 === candSnap[key].id1){
            votesIndividual++;
        }
    });
    //Create alert with vote porcentage
    let votePercent = votesIndividual/total * 100;
    text+=(candSnap[key].nombre + " : " + votePercent + "%" + "\n");
});
alert(text);
}
function currentList(info){
    let text = "";
    //Me da el arreglo de las llaves de un objeto
    Object.keys(info).forEach((k,index)=>{
        console.log(k, index);
        text += "ID:" +info[k].id1+ "   Nombre: " +info[k].nombre + "\n";
    });
    alert(text);
}



//Metodo registrar votos
function voteRegister (vote){
    //Obtener base de datos
    const db = getDatabase();
    const dbRef = push(ref(db, 'votes'));
    const candRef = ref(db, 'candidates/' + vote.id2);
    //Obtener una sola vez los datos de candidatos
    get(candRef).then ((snapshot) => {
        const data = snapshot.val();
        
        //Verifica que el ID sea efectivamente único
       if(data===null){
        alert("El ID no corresponde a ningún candidato registrado");
       }else{
        set(dbRef, vote);
        
       }
      });
    
}

//Instancias de los objetos
const id1 = document.getElementById("id1");
const nombre = document.getElementById("nombre");
const registerBtn = document.getElementById("registerBtn");

const id2 = document.getElementById("id2");
const voteBtn = document.getElementById("voteBtn");

const candListBtn = document.getElementById("candListBtn");
const voteListBtn = document.getElementById("voteListBtn");


//Metodo llamado desde el botón para crear candidatos
const eventRegister = (e, event,candData) =>{
   //Condición pa que no queden vacios los campos
    if(id1.value!=""||nombre.value!=""){
    const candidate = {
        id1: id1.value,
        nombre: nombre.value
    }
    candRegister(candidate);
    id1.value='';
    nombre.value='';
}else{
    alert("Por favor introducir Nombre e ID antes de registrar");
}
}



//Metodo llamado desde el botón para crear votos
const eventVote = (e, event) =>{
  
   //Condición pa que no queden vacios los campos
   if(id2.value!=''){
   
    const vote = {
        
        id2: id2.value,
    }
    voteRegister(vote);
    id2.value='';
}else{
    alert("Por favor introducir un ID antes de votar"); 
}
}


//Clicks
registerBtn.addEventListener('click', eventRegister);
voteBtn.addEventListener('click',eventVote);
candListBtn.addEventListener('click', getCand);
voteListBtn.addEventListener('click', getVotes);



