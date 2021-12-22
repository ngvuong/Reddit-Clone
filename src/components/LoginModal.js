import Modal from "./Modal";

function LoginModal({ onClose }) {
  return (
    <Modal onClose={onClose} heading="Login">
      <fieldset className="input-field email-field">
        <input type="email" placeholder="Email *" />
      </fieldset>
      <fieldset className="input-field password-field">
        <input type="password" placeholder="Password *" />
      </fieldset>
      <button className="btn-signin">Login</button>
      <div className="bottom-prompt">
        New to Reddit?
        <a href="/signup"> SIGN UP</a>
      </div>
    </Modal>
  );
}

export default LoginModal;
