import Modal from "./Modal";

function LoginModal({ onClose, onLinkClick }) {
  return (
    <Modal onClose={onClose} heading="Login">
      <fieldset className="input-field email-field">
        <input type="email" placeholder="Email *" required />
      </fieldset>
      <fieldset className="input-field password-field">
        <input type="password" placeholder="Password *" required />
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
