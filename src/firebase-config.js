const firebaseConfig = {
  apiKey: "AIzaSyBgKhcSQGzsgvUb_YQy2oAB8WlvnFdkHlo",
  authDomain: "practicasemana10eco.firebaseapp.com",
  projectId: "practicasemana10eco",
  storageBucket: "practicasemana10eco.appspot.com",
  messagingSenderId: "522593139537",
  appId: "1:522593139537:web:4f2a875d15dbaa6b1c3170"
  };

  export function getFirebaseConfig(){
    if(!firebaseConfig || !firebaseConfig.apiKey){
        throw new Error("Firebase configuration error");
    }else{
        return firebaseConfig;
    }
  }