import React, { useState, useEffect } from "react";
import styled from "styled-components";
import upvoteIcon from "../assets/upvote-icon.svg";
import downvoteIcon from "../assets/downvote-icon.svg";
import commentIcon from "../assets/comment-icon.svg";
import shareIcon from "../assets/share-icon.svg";

import { getFirestore, doc, updateDoc } from "firebase/firestore";

function PostCard({ data }) {
  const [votes, setVotes] = useState(data.votes);

  useEffect(() => {
    const postRef = doc(getFirestore(), "posts", data.id);
    updateDoc(postRef, { votes });
  }, [votes, data.id]);

  const onUpvote = () => {
    setVotes(votes + 1);
  };

  const onDownvote = () => {
    if (votes > 0) {
      setVotes(votes - 1);
    }
  };

  return (
    <StyledPostCard>
      <div className="votes-container">
        <button onClick={onUpvote}>
          <img src={upvoteIcon} alt="Up arrow" />
        </button>
        <div className="votes">{votes ? votes : "Vote"}</div>
        <button onClick={onDownvote}>
          <img src={downvoteIcon} alt="Down arrow" />
        </button>
      </div>
      <div className="post">
        <div className="post-header">
          r/reddit
          <span className="poster">Posted by {data.user}</span>
        </div>
        <h3 className="post-title">{data.title}</h3>
        <div className="post-body">
          {data.type === "text" ? (
            <div className="text-container">
              <p>{data.body}</p>
            </div>
          ) : data.body.includes("youtu") ? (
            <div className="video-container">
              <iframe
                src={data.body}
                title="{data.title}"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          ) : data.type !== "link" ? (
            <div className="image-container">
              <img src={data.body} alt={data.title} />
            </div>
          ) : (
            <div className="link-container">
              <a href={data.src} target="_blank" rel="noreferrer">
                {data.body}... <img src={shareIcon} alt="Share icon" />
              </a>
            </div>
          )}
        </div>
        <div className="post-footer">
          <div className="votes-container-row">
            <button>
              <img src={upvoteIcon} alt="Up arrow" />
            </button>
            <div className="votes">{data.votes ? data.votes : "Vote"}</div>
            <button>
              <img src={downvoteIcon} alt="Down arrow" />
            </button>
          </div>
          <a href="/comments/">
            <img src={commentIcon} alt="Comment bubble" />
            <span>{data.comments.length} Comments</span>
          </a>
        </div>
      </div>
    </StyledPostCard>
  );
}

const StyledPostCard = styled.article`
  position: relative;
  width: 100%;
  color: #d7dadc;
  background-color: rgba(26, 26, 27, 0.8);
  border: 1px solid #343536;
  margin-bottom: 10px;

  &:hover {
    border: 1px solid #818384;
    cursor: pointer;
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

  .post {
    padding-top: 8px;
  }

  .post-header {
    color: #d7dadc;
    font-size: 12px;
    line-height: 16px;
    margin: 0 8px 8px;
  }

  .poster {
    margin-left: 8px;
    color: #818384;
    margin-right: 3px;
  }

  .post-title {
    margin: 0 8px;
    font-size: 18px;
  }

  .post-body {
    display: flex;
    padding: 5px 8px 10px;
    margin-top: 8px;
    background: #1a1a1b;
  }

  .text-container {
    mask-image: linear-gradient(180deg, #000 60%, transparent);
    max-height: 250px;
  }

  .video-container {
    position: relative;
    height: 0;
    width: 100%;
    padding-bottom: 56.25%;
  }

  .video-container iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
  }

  .image-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .image-container img {
    max-height: 512px;
    max-width: 100%;
  }

  .link-container {
  }

  .link-container a {
    font-size: 12px;
    display: flex;
    align-items: center;
    color: #4fbcff;
    text-decoration: none;
  }

  .link-container a:hover {
    text-decoration: underline;
  }

  .link-container img {
    width: 16px;
    height: 16px;
    filter: invert(66%) sepia(10%) saturate(6163%) hue-rotate(178deg)
      brightness(105%) contrast(101%);
  }

  .post-footer {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    padding: 0 10px 0 4px;
  }

  .post-footer .votes {
    margin: 0 1px;
    width: 32px;
    text-align: center;
  }

  .post-footer a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #818384;
    padding: 8px;
  }

  .post-footer a img {
    margin-right: 6px;
    filter: invert(58%) sepia(6%) saturate(98%) hue-rotate(155deg)
      brightness(88%) contrast(85%);
  }

  @media (min-width: 640px) {
    border-radius: 4px;
    padding-left: 40px;

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

export default PostCard;
