import Modal from "./Modal";
import google from "../assets/google-icon.svg";

function LoginModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <h2>Login</h2>
      <form>
        <button>
          <img src={google} alt="Google icon" />
        </button>
      </form>
    </Modal>
  );
}

export default LoginModal;
