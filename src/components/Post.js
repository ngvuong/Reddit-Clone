import React, { useState } from "react";
import PostCard from "./PostCard";
import styled from "styled-components";
import upvoteIcon from "../assets/upvote-icon.svg";
import downvoteIcon from "../assets/downvote-icon.svg";

function Post({ postData }) {
  const [votes, setVotes] = useState(postData.votes);

  const onUpvote = () => {
    setVotes(votes + 1);
  };

  const onDownvote = () => {
    if (votes > 0) {
      setVotes(votes - 1);
    }
  };

  console.log(postData.user);
  return (
    <StyledPost>
      {/* <div className="votes-container">
        <button onClick={onUpvote}>
          <img src={upvoteIcon} alt="Up arrow" />
        </button>
        <div className="votes">{votes ? votes : "Vote"}</div>
        <button onClick={onDownvote}>
          <img src={downvoteIcon} alt="Down arrow" />
        </button>
      </div> */}
      <PostCard data={postData} />
    </StyledPost>
  );
}

const StyledPost = styled.main`
  position: relative;
  width: 100%;
  max-width: 740px;
  background: #1a1a1b;
  /* padding: 8px 0 0 40px; */
  border-radius: 4px;
  margin: 32px 12px 32px 32px;

  & > article {
    border: none;
  }

  & > article:hover {
    border: none;
    cursor: default;
  }

  .text-container {
    mask-image: none;
  }

  .votes-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    padding: 8px 4px 8px 0;
    border-left: 4px solid transparent;
  }

  .votes-container-row {
    display: flex;
    align-items: center;
    padding: 0 2px;
    margin: 0;
  }

  .votes-container .votes {
    font-size: 12px;
    font-weight: 700;
    margin: 4px 0;
  }

  .votes-container button,
  .votes-container-row button {
    background-color: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
  }

  .votes-container img,
  .votes-container-row img {
    width: 20px;
    height: 20px;
    filter: invert(58%) sepia(6%) saturate(98%) hue-rotate(155deg)
      brightness(88%) contrast(85%);
  }

  @media (min-width: 640px) {
    /* border-radius: 4px;
    padding-left: 40px; */

    .votes-container-row {
      display: none;
    }
  }

  @media (max-width: 639px) {
    .votes-container {
      display: none;
    }
  }
`;

export default Post;
