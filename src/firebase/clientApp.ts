import { initializeApp } from "firebase/app";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const firestore = getFirestore();
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current session
    // You can also use 'local' or 'none' if you prefer different persistence options
    console.log("Session persistence enabled");
  })
  .catch((error) => {
    console.log("Error setting session persistence:", error);
  });

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      console.log(name, email);

      localStorage.setItem("name", name as string);
      localStorage.setItem("email", email as string);

      // Create a user document in Firestore with the user's UID as the document ID

      const userDocRef = doc(firestore, "users", result.user.uid);

      // Set the user document fields
      setDoc(userDocRef, {
        createdAt: serverTimestamp(), // Firestore server timestamp
        username: name, // Using the display name as the username in this case
        email: email,
      })
        .then(() => {
          console.log("User document created successfully");
          // Additional code after creating user document if needed
        })
        .catch((error) => {
          console.error("Error creating user document:", error);
          // Handle error if necessary
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

const signUpWithEmail = (username: string, email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Set the display name of the user using the incoming username
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            console.log("Display name set successfully:", username);
            // Additional code after setting the display name if needed

            const userDocRef = doc(firestore, "users", user.uid);
            setDoc(userDocRef, {
              createdAt: serverTimestamp(), // Firestore server timestamp
              username: username,
              email: email,
            }).then(() => {
              console.log("User document created successfully");
              // Additional code after setting the display name and creating user document if needed
            });
          })
          .catch((error) => {
            console.error("Error setting display name:", error);
            // Handle error if necessary
          });

        console.log("User created", user);
        // Additional code after user signup if needed
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // Handle error if necessary
    });
};

const signInWithEmail = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const signOutFirebase = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log("error signing out", error);
    });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user

    const uid = user.uid;
    console.log("the logged in user is", user, uid);
    // ...
  } else {
    // User is signed out
    // ...
    console.log("no user logged in");
  }
});

export {
  firestore,
  auth,
  signInWithGoogle,
  signUpWithEmail,
  signInWithEmail,
  signOutFirebase,
};
