import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, firestore, provider } from ".";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const signInWithGoogle = async (
  setLoggedInUser: (user: User | null) => void
) => {
  try {
    const result = await signInWithPopup(auth, provider);

    const username = result.user.displayName;
    const email = result.user.email;

    localStorage.setItem("username", username as string);
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
          username, // Using the display name as the username in this case
          email,
        });

        console.log("User document created successfully");
        // Additional code after creating user document if needed
      } catch (error) {
        console.error("Error creating user document:", error);
        // Handle error if necessary
      }
    }

    setLoggedInUser(result.user);
    return Promise.resolve();
  } catch (error) {
    console.error("Error getting document or sign in:", error);
  }
};

const signUpWithEmail = (
  username: string,
  email: string,
  password: string,
  setLoggedInUser: (user: User | null) => void
) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (auth.currentUser) {
        return updateProfile(auth.currentUser, {
          displayName: username,
        }).then(() => {
          const userDocRef = doc(firestore, "users", user.uid);
          return setDoc(userDocRef, {
            createdAt: serverTimestamp(),
            username: username,
            email: email,
          }).then(() => {
            // set UserContext
            setLoggedInUser(auth.currentUser);
          });
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

const signInWithEmail = (
  email: string,
  password: string,
  setLoggedInUser: (user: User | null) => void
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User signed in", user);
      setLoggedInUser(user);
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
