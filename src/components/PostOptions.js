import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import hotIcon from "../assets/hot-icon.svg";
import newIcon from "../assets/new-icon.svg";
import topIcon from "../assets/top-icon.svg";

function PostOptions({ onSort }) {
  const hotRef = useRef(null);
  const newRef = useRef(null);
  const topRef = useRef(null);
  const btnRefs = [hotRef, newRef, topRef];

  useEffect(() => {
    newRef.current.classList.add("active");
  }, []);

  const onHotClick = (e) => {
    btnRefs.forEach((ref) => ref.current.classList.remove("active"));
    e.currentTarget.classList.add("active");
    onSort("hot");
  };

  const onNewClick = (e) => {
    btnRefs.forEach((ref) => ref.current.classList.remove("active"));
    e.currentTarget.classList.add("active");
    onSort("new");
  };

  const onTopClick = (e) => {
    btnRefs.forEach((ref) => ref.current.classList.remove("active"));
    e.currentTarget.classList.add("active");
    onSort("top");
  };
  return (
    <StyledOptions>
      <div className="options">
        <button className="btn-hot" onClick={onHotClick} ref={hotRef}>
          <img src={hotIcon} alt="Fire icon" /> Hot
        </button>

        <button className="btn-new" onClick={onNewClick} ref={newRef}>
          <img src={newIcon} alt="New icon" /> New
        </button>
        <button className="btn-top" onClick={onTopClick} ref={topRef}>
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

  .options button.active {
    color: #d7dadc;
    background: #29292b;
  }

  .options button.active img {
    filter: invert(93%) sepia(8%) saturate(70%) hue-rotate(161deg)
      brightness(98%) contrast(82%);
  }
`;
export default PostOptions;
