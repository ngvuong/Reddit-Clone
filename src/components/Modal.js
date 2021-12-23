import React from "react";
import styled from "styled-components";
import modalBg from "../assets/modal-bg.png";
import google from "../assets/google-icon.svg";

function Modal({ children, heading, onClose, onSubmit }, ref) {
  return (
    <StyledModal>
      <button className="btn-close" onClick={onClose}>
        ×
      </button>
      <div className="modal-art"></div>
      <div className="modal-content">
        <h2>{heading}</h2>
        <form onSubmit={onSubmit} ref={ref}>
          <button type="button" className="btn-google">
            <img src={google} alt="Google icon" />
            <span>Continue with Google</span>
          </button>
          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">OR</span>
            <span className="divider-line"></span>
          </div>
          <div className="fields-container">{children}</div>
        </form>
      </div>
    </StyledModal>
  );
}

const StyledModal = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60vw;
  max-width: 850px;
  min-width: min-content;
  height: 75vh;
  color: #1a1a1b;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.modal};

  .btn-close {
    position: absolute;
    right: 0;
    font-size: 2.5rem;
    color: grey;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .modal-art {
    background-image: url(${modalBg});
    height: 100%;
    width: 20%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .modal-content {
    width: 100%;
    align-self: center;
    padding: 24px;
  }

  .modal-content form {
    width: min-content;
  }

  .modal-content h2 {
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 48px;
  }

  .btn-google {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    width: 280px;
    font-size: 14px;
    font-weight: 500;
    background: transparent;
    border-radius: 20px;
    padding: 0 12px;
    margin-bottom: 18px;
    cursor: pointer;
  }

  .btn-google img {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    vertical-align: middle;
  }

  .btn-google span {
    flex-grow: 1;
  }

  .divider {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 28px 0;
  }

  .divider-line {
    width: 40%;
    border-top: 1px solid #edeff1;
  }

  .input-field {
    border: none;
    padding: 0;
    margin: 0 0 12px 0;
  }

  .input-field input {
    height: 48px;
    width: 100%;
    background-color: #fcfcfb;
    padding: 10px 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-size: 14px;
    line-height: 21px;
    outline: 0;
  }

  .btn-signin,
  .btn-signup {
    height: 40px;
    width: 100%;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    background: #0079d3;
    padding: 0 16px;
    border-radius: 20px;
    cursor: pointer;
  }

  .fields-container span {
    color: red;
    font-size: 12px;
    font-style: italic;
  }

  .bottom-prompt {
    font-size: 12px;
    margin-top: 12px;
  }

  .bottom-prompt a {
    color: #0079d3;
    text-decoration: none;
    font-weight: 600;
    line-height: 24px;
  }
`;

const ForwardedModal = React.forwardRef(Modal);

export default ForwardedModal;
