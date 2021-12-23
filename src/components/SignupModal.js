import React, { useEffect, useRef } from "react";
import Modal from "./Modal";

function SignupModal({ onClose, onLinkClick }) {
  const formRef = useRef(null);

  useEffect(() => {
    console.dir(formRef.current.elements);
  }, []);
  return (
    <Modal onClose={onClose} heading="Sign up" ref={formRef}>
      <fieldset className="input-field username-field">
        <input type="text" placeholder="Username *" name="username" required />
      </fieldset>
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
      <button type="button" className="btn-signup">
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
