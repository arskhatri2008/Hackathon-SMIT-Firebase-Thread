import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtoHO9K3f0TqgeKboyRweL0hVYHe1-PCI",
  authDomain: "quiz-application-smit-project.firebaseapp.com",
  databaseURL:
    "https://quiz-application-smit-project-default-rtdb.firebaseio.com",
  projectId: "quiz-application-smit-project",
  storageBucket: "quiz-application-smit-project.appspot.com",
  messagingSenderId: "441119782778",
  appId: "1:441119782778:web:30e14238687c6e18f248c3",
  measurementId: "G-FQJS0FGWV7",
};

//   // Initialize Firebase
const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
const auth = getAuth();

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById('profileEmail')
const updateForm = document.getElementById("updateForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const newPasswordInput = document.getElementById("newPassword");

const firstName = sessionStorage.getItem("firstName");
const lastName = sessionStorage.getItem("lastName");

// Check if the user is logged in and get the UID
onAuthStateChanged(auth, (user) => {
//   console.log(user);
  if (user) {
    // Display the user's profile name
    profileName.textContent = `${firstName} ${lastName}` || "User";
    profileEmail.textContent = user.email

    // Update user details on form submission
    updateForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const firstName = firstNameInput.value;
      const lastName = lastNameInput.value;
      const newPassword = newPasswordInput.value;

      // Update first name and last name
      updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      })
        .then(() => {
          profileName.textContent = `${firstName} ${lastName}`;
          sessionStorage.setItem('firstName', firstName)
          sessionStorage.setItem('lastName', lastName)
          alert("Profile details updated successfully!");
        })
        .catch((error) => {
          console.log("Error updating profile:", error);
        });

        if(newPassword){
            const user = auth.currentUser;
            // const newPassword = getASecureRandomPassword();
      updatePassword(user, newPassword)
    //   console.log(newPassword)
        .then(() => {
            newPasswordInput.value = ''
            console.log(newPasswordInput)
            alert('Password updated successfully')
          // Update successful.
        })
        .catch((error) => {
            console.log('Error updating password', error)
          // An error ocurred
          // ...
        })
    };

      // Update password if new password is provided
      // if (newPassword) {
      //     user.updatePassword(newPassword)
      //         .then(() => {
      //             newPasswordInput.value = "";
      //             alert("Password updated successfully!");
      //         })
      //         .catch((error) => {
      //             console.log("Error updating password:", error);
      //         });
      // }
    });
  }
});
