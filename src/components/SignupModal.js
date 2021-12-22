import Modal from "./Modal";

function SignupModal({ onClose, onLinkClick }) {
  return (
    <Modal onClose={onClose} heading="Sign up">
      <fieldset className="input-field username-field">
        <input type="text" placeholder="Username *" required />
      </fieldset>
      <fieldset className="input-field email-field">
        <input type="email" placeholder="Email *" required />
      </fieldset>
      <fieldset className="input-field password-field">
        <input type="password" placeholder="Password *" required />
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
