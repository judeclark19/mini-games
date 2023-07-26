import { browserSessionPersistence, setPersistence } from "firebase/auth";
import { auth } from ".";

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current session
    // You can also use 'local' or 'none' if you prefer different persistence options
    console.log("Session persistence enabled");
  })
  .catch((error) => {
    console.log("Error setting session persistence:", error);
  });

// if I ever figure out how to get the auth state into a global state then this can be used
// onAuthStateChanged(auth, (user) => {
//   console.log("onAuthStateChanged from clientApp.ts");
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user

//     const uid = user.uid;
//     // console.log("the logged in user is", user, uid);
//     // ...
//   } else {
//     // User is signed out
//     // ...
//     // console.log("no user logged in");
//   }
// });
