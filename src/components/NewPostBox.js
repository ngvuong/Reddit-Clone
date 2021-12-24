import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import avatar from "../assets/avatar-large.svg";

function NewPostBox() {
  const navigate = useNavigate();

  return (
    <StyledNewPostBox>
      <img src={avatar} alt="Reddit avatar" />
      <input
        type="text"
        placeholder="Create Post"
        onFocus={() => navigate("/submit")}
      />
    </StyledNewPostBox>
  );
}

const StyledNewPostBox = styled.div`
  display:flex;
  width: 100%;
  height: 58px;
  background-color: #1a1a1b;
  padding 8px;
  border: 1px solid #343536;
  border-radius: 4px;
  margin-bottom: 16px;

  img {
    width: 38px;
    height: 38px;
    background: #818384;
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(237deg) brightness(103%) contrast(101%);
    border: 1px solid transparent;
    border-radius:50%;
    margin-right: 8px;
  }

  input {
    flex-grow: 1;
    height: 38px;
    color: inherit;
    font-size:14px;
    background-color: #272729;
    padding: 0 16px;
    border: 1px solid #343536;
    border-radius: 4px;
    margin-right: 8px;
    outline: none;
  }


`;

export default NewPostBox;
