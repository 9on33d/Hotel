import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBOhr24Xi5kv-P3MmYCDZFx6St3DAwYDeI",
  authDomain: "on33d-hotel.firebaseapp.com",
  projectId: "on33d-hotel",
  storageBucket: "on33d-hotel.appspot.com",
  messagingSenderId: "723487401278",
  appId: "1:723487401278:web:f2cac1ccb3e724505f386f",
  measurementId: "G-TF8N23EW9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);

let UserInp = document.getElementById('userInp');
let EmailInp = document.getElementById('emailInp');
let loginPassword = document.getElementById('loginPassword');
let registerPassword = document.getElementById('registerPassword');
let MainForm = document.getElementById('MainForm');
let MainForm2 = document.getElementById('MainForm2');
let ForgotPass = document.getElementById('forgotpass');

let RegisterUser = evt => {
    evt.preventDefault();

    createUserWithEmailAndPassword(auth, EmailInp.value, registerPassword.value)
    .then(async(credentials)=>{
        var ref = doc(db, "UserAuthList", credentials.user.uid);
        await setDoc(ref, {
            username: UserInp.value
        })
    })
    .catch((error)=>{
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
}
MainForm.addEventListener('submit', RegisterUser);
let EmailInpLogin = document.getElementById('emailInpLogin'); // Assuming you have an email input field for login

let SignInUser = evt => {
    evt.preventDefault();

    signInWithEmailAndPassword(auth, EmailInpLogin.value, loginPassword.value)
    .then(async(credentials)=>{
        var ref = doc(db, "UserAuthList", credentials.user.uid);
        const docSnap = await getDoc(ref);

        if(docSnap.exists()){
            sessionStorage.setItem("user-info",JSON.stringify({
                username: docSnap.data().username,
            }))
            sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
            window.location.href = "index.html";
        }
    })
    .catch((error)=>{
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
}

let ForgotPassword = () => {
    sendPasswordResetEmail(auth, EmailInpLogin.value)
    .then(()=>{
        alert("A Password Reset Link has been sent to your email");
    })
    .catch((error)=>{
        console.log(error.code);
        console.log(error.message);
    })
}
MainForm2.addEventListener('submit', SignInUser);

ForgotPass.addEventListener('click',ForgotPassword);

