import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc, query, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"


const firebaseConfig = {
  apiKey: "AIzaSyA6rPgADeV2urG66cavO0pFmeeLHKOTcnc",
  authDomain: "hackathon-firebase-efe95.firebaseapp.com",
  projectId: "hackathon-firebase-efe95",
  storageBucket: "hackathon-firebase-efe95.firebasestorage.app",
  messagingSenderId: "334085100783",
  appId: "1:334085100783:web:bd752d5a5b0c77a8d3771a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// Signup functionality
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const name = document.getElementById('fName').value;
  const lname = document.getElementById('lName').value;
  const phone = document.getElementById('rphone').value;

  try {
    await createUserWithEmailAndPassword(auth, email, password, name, lname, phone);
    Swal.fire('Signup successful!', '', 'success');
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: ".this account is Already Exist",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }
});

// Login functionality
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    Swal.fire('login successful!', '', 'success');

    // document.getElementById('postSection').style.display = 'block'; // Show post section after login
    window.location.href = 'post.html';
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: ".Account does not Exist",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }
});


document.getElementById('postForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('postTitle').value;
  const content = document.getElementById('postContent').value;
  const category = document.getElementById('postCategory').value;

  try {
    await addDoc(collection(db, "posts"), {
      title,
      content,
      category,
      timestamp: new Date(),
    });
    alert('Post added successfully!');
  } catch (error) {
    alert(error.message);
  }
});


document.getElementById('searchBar').addEventListener('input', async (e) => {
  const searchValue = e.target.value.toLowerCase();
  const postsContainer = document.getElementById('postsContainer');
  postsContainer.innerHTML = '';

  if (searchValue.trim() === '') return;

  const q = query(collection(db, "posts"), orderBy("timestamp"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const post = doc.data();
    if (
      post.title.toLowerCase().includes(searchValue) ||
      post.category.toLowerCase().includes(searchValue)
    ) {
      postsContainer.innerHTML += `
          <div>
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>Category: ${post.category}</small>
          </div>
        `;
    }
  });

  if (postsContainer.innerHTML === '') {
    postsContainer.innerHTML = '<p>No posts found.</p>';
  }
});



















































































