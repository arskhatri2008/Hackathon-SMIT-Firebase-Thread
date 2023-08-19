  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  import { getAuth , signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
  import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"; // Add this line
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

  let signIn = document.getElementById('loginForm')
  signIn.addEventListener('submit',(event)=>{
    event.preventDefault()
    let email = document.getElementById("emailInput").value
    let password = document.getElementById("passwordInput").value        
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user.email);
    alert('Sign-In Successfully!');
    location.href="./main.html";
    // ...
  })
  .catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log(errorCode, errorMessage);
  alert('Incorrect email or password')
  });  
    });
