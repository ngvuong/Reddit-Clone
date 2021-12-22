import styled from "styled-components";
import modalBg from "../assets/modal-bg.png";

function Modal({ children, onClose }) {
  return (
    <StyledModal>
      <button onClick={onClose}>×</button>
      <div className="modal-art"></div>
      <div className="modal-content">{children}</div>
    </StyledModal>
  );
}

const StyledModal = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  min-width: min-content;
  height: 75vh;
  color: #1a1a1b;
  transform: translate(-50%, -50%);
  background-color: #ffffff;

  button {
    position: absolute;
    right: 0;
    font-size: 2.5rem;
    color: grey;
    background: transparent;
    border: none;
  }

  .modal-art {
    background-image: url(${modalBg});
    height: 100%;
    width: 20%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .modal-content {
    padding: 24px;
    align-self: center;
  }

  .modal-content h2 {
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 48px;
  }
`;

export default Modal;
