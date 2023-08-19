import {initializeApp} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBtoHO9K3f0TqgeKboyRweL0hVYHe1-PCI",
    authDomain: "quiz-application-smit-project.firebaseapp.com",
    databaseURL: "https://quiz-application-smit-project-default-rtdb.firebaseio.com",
    projectId: "quiz-application-smit-project",
    storageBucket: "quiz-application-smit-project.appspot.com",
    messagingSenderId: "441119782778",
    appId: "1:441119782778:web:30e14238687c6e18f248c3",
    measurementId: "G-FQJS0FGWV7"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  let signUp =  document.getElementById("signupForm")
  signUp.addEventListener('submit',(event)=>{
    event.preventDefault()
    let email = document.getElementById("emailInput").value
    let password = document.getElementById("passwordInput").value
    let firstName = document.getElementById("firstName").value
    let lastName = document.getElementById("lastName").value
    createUserWithEmailAndPassword(auth, email, password , firstName , lastName)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user.email);
    sessionStorage.setItem('firstName', firstName)
    sessionStorage.setItem('lastName', lastName)
    alert('Sign-Up Successfully');
    location.href="./login.html"
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // ..
    });
  });
