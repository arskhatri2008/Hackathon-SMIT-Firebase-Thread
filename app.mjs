import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  onChildRemoved,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const postsRef = ref(database, "posts");
const userInfo = document.getElementById("user-info");
const userEmailSpan = document.getElementById("user-email");
const signOutBtn = document.getElementById("logoutButton");
const form1 = document.getElementById("form1");
const title = document.getElementById("title");
const text = document.getElementById("text");
const displayPosts = document.getElementById("displayPosts");
const signedOutContent = document.getElementById('signOutContent')
const signedInContent = document.getElementById('user-info')
const signInBtn = document.getElementById("signInBtn");
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')


let currentUserUid = null; // To store the UID of the current user

// const updateUI = () =>{
//     if(currentUserUid){
//         signInBtn.style.display = 'none';
//         signedInContent.style.display = 'block';
//         signedOutContent.style.display = 'block';
//         usernameSpan.textContent = currentUserUid
//     }else{
//         signInBtn.display = 'block';
//         signedInContent.style.display = 'none';
//         signedOutContent.style.display = 'none'
//     }
// }
// Check if the user is logged in and get the UID
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUserUid = user.uid;
    // Display the user's email
    userEmailSpan.textContent = user.email;
    firstName.innerHTML = sessionStorage.getItem('firstName')
    firstName.style.display = 'inline'
    lastName.innerHTML = sessionStorage.getItem('lastName')
    lastName.style.display = 'inline'
    // Show the user info section
    userInfo.style.display = "block";
    // signOutContent.display = 'none'
    // updateUI()
  } else {
    currentUserUid = null;
    // Hide the user info section if not logged in
    userInfo.style.display = "none";
    // signInBtn.addEventListener('click',()=>{
    //     window.location.href = './login.html'
    // })
  }
});

form1.addEventListener("submit", (e) => {
  e.preventDefault();

  // const postText = text.value.trim();
  const postTitle = title.value.trim(); // Get the title value
  const postText = text.value.trim(); // Get the text value

  if (postTitle !== "" && postText !== "") {
    // const timestamp = firebase.database.ServerValue.TIMESTAMP;
    push(postsRef, {
      title: postTitle, // Add title property
      text: postText, // Add text property
      createdBy: currentUserUid,
    //   createdOn: timestamp,
    }).then(() => {
      title.value = "";
      text.value = "";
    });
  }
  // if (postText !== "") {
  //   push(postsRef, { text: postText, createdBy: currentUserUid }).then(() => {
  //     title.value = "";
  //     text.value = "";
  //   });
  // }
});

onChildAdded(postsRef, (data) => {
  const post = data.val();
  const postId = data.key;
  const createdBy = post.createdBy;

  const postContainer = document.createElement("div");
  postContainer.setAttribute("id", postId);
  postContainer.style.border = '1px solid #ddd'
  postContainer.style.padding = '20px'
  postContainer.style.margin = '20px'
  postContainer.style.backgroundColor = '#fff'
  postContainer.style.boxShadow = '0px 0px 5px rgba(0, 0, 0, 0.1)'
  // postContainer.style.margin = '5px' 
    // '',
    // 'padding: 20px',
    // 'margin: 20px',
    // 'background-color: #fff',
    // 'box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1)'
  

  const titleParagraph = document.createElement("h3"); // Create a <p> for title
  titleParagraph.textContent = `Title: ${post.title}`; // Display title

  const textParagraph = document.createElement("p"); // Create a <p> for text
  textParagraph.textContent = `Text: ${post.text}`; // Display text

//   const createdOnParagraph = document.createElement("p");
//   const createdOnDate = new Date(post.createdOn); // Convert timestamp to a readable date
//   createdOnParagraph.textContent = `Created On: ${createdOnDate}`;

  postContainer.appendChild(titleParagraph);
  postContainer.appendChild(textParagraph);
//   postContainer.appendChild(createdOnParagraph);
  // postContainer.appendChild(deleteButton)
  // postContainer.appendChild(editButton)

  // li.textContent = post.text;
  // li.id = postId;

  // Add the delete button if the post was created by the current user
  if (currentUserUid === createdBy) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute('class','post-del')
    deleteButton.addEventListener("click", () => {
      // Check if the current user is the creator of the post before deleting
      if (currentUserUid === createdBy) {
        remove(data.ref);
        alert("Post deleted successfully");
      } else {
        alert("You can only delete your own posts.");
      }
    });
    postContainer.appendChild(deleteButton);

    // Add the edit button for the post
    const editButton = document.createElement("button");
    editButton.setAttribute('class','post-edit')
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      if (currentUserUid === createdBy) {
        const newTitle = prompt("Edit the title:", post.title);
        const newText = prompt("Edit the text:", post.text);

        if (newTitle !== null && newText !== null) {
          const updatedPost = {
            title: newTitle,
            text: newText,
            createdBy: currentUserUid,
          };

          update(data.ref, updatedPost)
            .then(() => {
              console.log("Post updated successfully");
              alert("Post created successfully");
              
            })
            .catch((error) => {
              console.log("Error updating post", error);
            });
        }
    } else {
        alert("You can only edit your own posts.");
    }
    });
    postContainer.appendChild(editButton);
  }
  displayPosts.appendChild(postContainer);
});

onChildRemoved(postsRef, (snapshot) => {
  const postId = snapshot.key;
  const postContainer = document.getElementById(postId);
  if (postContainer) {
    postContainer.remove();
  }
  // li.remove();
});

document.addEventListener("DOMContentLoaded", (event) => {
    // console.log(event)
    // const nav = document.getElementById('nav-bar')
    const signOutBtn = document.getElementById("sign-out-btn");
    // const usernameSpan = document.getElementById('user-email')

    // let currentUserUid = null
// const uid = userEmailSpan
// console.log(uid)
    
    // signInBtn.addEventListener('click',()=>{
    //     window.location.href = './login.html'
    // })
    
    // Sign out event listener
    signOutBtn.addEventListener("click", () => {
        // const userId = currentUserUid;
        signOut(auth)
        .then(() => {
            // Sign-out successful.
            alert(`Sign Out Successful!`);
            location.href = './index.html'
        })
        .catch((error) => {
            console.log("Error signing out:", error);
        });
    });
    // updateUI()
});