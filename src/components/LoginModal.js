import React, { useEffect, useRef } from "react";
import Modal from "./Modal";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";

function LoginModal({ onClose, onLinkClick }) {
  const formRef = useRef(null);

  useEffect(() => {
    // console.dir(formRef.current.elements.email);
  }, []);

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

  const onSubmit = (e) => {
    e.preventDefault();
    const signinUser = async () => {
      const email = formRef.current.elements.email.value;
      const password = formRef.current.elements.password.value;
      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
        onClose();
      } catch (err) {
        console.error(err);
      }
    };

    signinUser();
  };

  return (
    <Modal
      onClose={onClose}
      onGoogleSignin={onGoogleSignin}
      heading="Login"
      onSubmit={onSubmit}
      ref={formRef}
    >
      <fieldset className="input-field email-field">
        <input type="email" placeholder="Email *" name="email" required />
      </fieldset>
      <fieldset className="input-field password-field">
        <input
          type="password"
          placeholder="Password *"
          name="password"
          required
        />
      </fieldset>
      <button type="submit" className="btn-signin">
        Login
      </button>
      <div className="bottom-prompt">
        New to Reddit?
        <a href="/signup" onClick={onLinkClick}>
          {" "}
          SIGN UP
        </a>
      </div>
    </Modal>
  );
}

export default LoginModal;
