import styled from "styled-components";
import hotIcon from "../assets/hot-icon.svg";
import newIcon from "../assets/new-icon.svg";
import topIcon from "../assets/top-icon.svg";

function PostOptions() {
  return (
    <StyledOptions>
      <div className="options">
        <button className="btn-hot">
          <img src={hotIcon} alt="Fire icon" /> Hot
        </button>

        <button className="btn-new">
          <img src={newIcon} alt="New icon" /> New
        </button>
        <button className="btn-top">
          <img src={topIcon} alt="Top icon" /> Top
        </button>
      </div>
    </StyledOptions>
  );
}

const StyledOptions = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #1a1a1b;
  border: 1px solid #343536;
  border-radius: 4px;
  padding: 10px 12px;
  margin-bottom: 16px;

  .options {
    display: flex;
    cursor: pointer;
  }

  .options button {
    display: flex;
    align-items: center;
    color: #818384;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 18px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 20px;
    padding: 6px 8px;
    margin-right: 8px;
    cursor: pointer;
  }

  .options button:hover {
    background: #29292b;
  }

  .options img {
    height: 20px;
    width: 28px;
    padding-right: 8px;
    filter: invert(56%) sepia(7%) saturate(96%) hue-rotate(155deg)
      brightness(90%) contrast(87%);
  }
`;
export default PostOptions;
