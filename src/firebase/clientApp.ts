import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, firestore, provider } from ".";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;

      localStorage.setItem("name", name as string);
      localStorage.setItem("email", email as string);

      const userDocRef = doc(firestore, "users", result.user.uid);

      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            console.log("No such document!");
            setDoc(userDocRef, {
              createdAt: serverTimestamp(),
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
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
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

            const userDocRef = doc(firestore, "users", user.uid);
            setDoc(userDocRef, {
              createdAt: serverTimestamp(),
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
    });
};

const signInWithEmail = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User signed in", user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

const signOutFirebase = () => {
  signOut(auth)
    .then(() => {
      console.log("signed out");
    })
    .catch((error) => {
      console.log("error signing out", error);
    });
};

export {
  firestore,
  auth,
  signInWithGoogle,
  signUpWithEmail,
  signInWithEmail,
  signOutFirebase,
};
