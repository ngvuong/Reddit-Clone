import styled from "styled-components";

function Modal() {
  return <StyledModal></StyledModal>;
}

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60vw;
  height: 75vh;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
`;

export default Modal;
