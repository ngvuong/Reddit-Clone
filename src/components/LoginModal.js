import React, { useEffect, useRef } from "react";
import Modal from "./Modal";

function LoginModal({ onClose, onLinkClick }) {
  const formRef = useRef(null);

  useEffect(() => {
    console.dir(formRef.current.elements.email);
  }, []);

  return (
    <Modal onClose={onClose} heading="Login" ref={formRef}>
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
      <button type="button" className="btn-signin">
        Login
      </button>
      <div className="bottom-prompt">
        New to Reddit?
        <a href="/signup" onClick={(e) => onLinkClick(e)}>
          {" "}
          SIGN UP
        </a>
      </div>
    </Modal>
  );
}

export default LoginModal;
