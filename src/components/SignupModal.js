import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  query,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";

function SignupModal({ onClose, onLinkClick }) {
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {}, []);

  const onGoogleSignin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(getAuth(), provider);
    // result.user.displayName = "test12";
    console.log(result.user.displayName);
    const docRef = doc(getFirestore(), "usernames", result.user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(getFirestore(), "usernames", result.user.uid), {
        username: result.user.displayName,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const existingUsernames = [];
    const signupUser = async () => {
      const searchQuery = query(collection(getFirestore(), "usernames"));
      const querySnapshot = await getDocs(searchQuery);
      querySnapshot.forEach((doc) => {
        existingUsernames.push(doc.data().username);
      });

      const username = formRef.current.elements.username.value;
      const email = formRef.current.elements.email.value;
      const password = formRef.current.elements.password.value;

      if (existingUsernames.includes(username)) {
        setShowUsernameError(true);
      } else {
        setShowUsernameError(false);
        try {
          const userCredentials = await createUserWithEmailAndPassword(
            getAuth(),
            email,
            password
          );
          onClose();

          userCredentials.user.displayName = username;
          await setDoc(
            doc(getFirestore(), "usernames", userCredentials.user.uid),
            {
              username,
            }
          );
        } catch (err) {
          if (err.code === "auth/email-already-in-use") {
            setShowEmailError(true);
            setShowPasswordError(false);
          } else if (err.code === "auth/weak-password") {
            setShowEmailError(false);
            setShowPasswordError(true);
          } else {
            console.error(err);
          }
        }
      }
    };

    signupUser();
  };

  return (
    <Modal
      onClose={onClose}
      heading="Sign up"
      onSubmit={onSubmit}
      onGoogleSignin={onGoogleSignin}
      ref={formRef}
    >
      {showUsernameError && <span>Username already exists.</span>}
      <fieldset className="input-field username-field">
        <input type="text" placeholder="Username *" name="username" required />
      </fieldset>
      {showEmailError && <span>Email already in use.</span>}
      <fieldset className="input-field email-field">
        <input type="email" placeholder="Email *" name="email" required />
      </fieldset>
      {showPasswordError && (
        <span>Password needs to be at least 6 characters.</span>
      )}
      <fieldset className="input-field password-field">
        <input
          type="password"
          placeholder="Password *"
          name="password"
          required
        />
      </fieldset>
      <button type="submit" className="btn-signup">
        Sign Up
      </button>
      <div className="bottom-prompt">
        Already a redditor?
        <a href="/login" onClick={(e) => onLinkClick(e)}>
          {" "}
          LOG IN
        </a>
      </div>
    </Modal>
  );
}

export default SignupModal;
