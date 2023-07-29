import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, firestore, provider } from ".";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const name = result.user.displayName;
    const email = result.user.email;

    localStorage.setItem("name", name as string);
    localStorage.setItem("email", email as string);

    const userDocRef = doc(firestore, "users", result.user.uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
      try {
        await setDoc(userDocRef, {
          createdAt: serverTimestamp(),
          username: name, // Using the display name as the username in this case
          email: email,
        });

        console.log("User document created successfully");
        // Additional code after creating user document if needed
      } catch (error) {
        console.error("Error creating user document:", error);
        // Handle error if necessary
      }
    }
    return Promise.resolve(); // Add this line
  } catch (error) {
    console.error("Error getting document or sign in:", error);
  }
};

const signUpWithEmail = (username: string, email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Set the display name of the user using the incoming username
      if (auth.currentUser) {
        return updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            console.log("Display name set successfully:", username);

            const userDocRef = doc(firestore, "users", user.uid);
            return setDoc(userDocRef, {
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
      } else {
        throw new Error("No current user");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      throw error;
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
