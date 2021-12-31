import React, { useState, useEffect, useRef } from "react";
import PostCard from "./PostCard";
import Comment from "./Comment";
import NewCommentBox from "./NewCommentBox";
import styled from "styled-components";
import arrowIcon from "../assets/arrow-icon.svg";

import {
  getFirestore,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

function Post({ postData, username }) {
  const [showOptions, setShowOptions] = useState(false);
  const [sortOption, setSortOption] = useState("top");
  const [commentData, setCommentData] = useState(postData.comments);
  const commentRef = useRef(null);

  useEffect(() => {
    const closeOptionsMenu = () => {
      if (showOptions) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", closeOptionsMenu);

    return () => document.removeEventListener("click", closeOptionsMenu);
  }, [showOptions]);

  useEffect(() => {
    const postRef = doc(getFirestore(), "posts", postData.id);
    updateDoc(postRef, { comments: commentData });
  }, [commentData, postData.id]);

  const onComment = () => {
    const commentText = commentRef.current.value;
    if (commentText) {
      setCommentData((prevData) => [
        ...prevData,
        {
          level: 1,
          text: commentText,
          votes: 0,
          replies: [],
          time: new Date(),
        },
      ]);
    }

    commentRef.current.value = "";
    console.log(commentData);
  };

  const onReply = (replyText, index) => {
    setCommentData((prevData) => {
      const targetComment = prevData[index];
      const replyData = {
        level: targetComment.level + 1,
        text: replyText,
        votes: 0,
        replies: [],
        time: new Date(),
      };
      const data = [...prevData];
      data.splice(index + 1, 0, replyData);
      return data;
    });
  };

  const comments = commentData.map((comment, i) => (
    <Comment commentData={comment} index={i} key={i} onReply={onReply} />
  ));

  return (
    <StyledPost>
      <PostCard comments={commentData} data={postData} username={username} />
      <div className="post-gap"></div>
      <div className="comment-box-container">
        <div className="comment-prompt">
          <span>Comment as {postData.user}</span>
        </div>
        <NewCommentBox
          onClick={onComment}
          showCancel={false}
          ref={commentRef}
        />
        {/* <div className="comment-box">
          <textarea
            name="comment"
            rows="7"
            placeholder="What are your thoughts?"
            ref={commentRef}
          ></textarea>

          <div className="comment-box-footer">
            <button onClick={onComment}>Comment</button>
          </div>
        </div> */}
      </div>
      <div className="sort-options-container">
        <div
          className="sort-options-inner"
          onClick={() => setShowOptions(!showOptions)}
        >
          <button className="btn-sort">sort by: {sortOption}</button>
          <img src={arrowIcon} alt="Arrow down icon" />
          {showOptions && (
            <div className="sort-options">
              <button onClick={() => setSortOption("top")}>Top</button>
              <button onClick={() => setSortOption("new")}>New</button>
              <button onClick={() => setSortOption("old")}>Old</button>
            </div>
          )}
        </div>
      </div>
      <div className="comments-container">{comments}</div>
    </StyledPost>
  );
}

const StyledPost = styled.main`
  position: relative;
  width: 100%;
  background: #1a1a1b;
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
    max-height: none;
  }

  .post-footer {
    padding-top: 60px;
  }

  .post-gap {
    height: 16px;
    background: #030303;
  }

  .comment-box-container {
    margin: 24px 40px 24px 48px;
  }

  .comment-prompt {
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 4px;
  }

  /* .comment-box {
    border: 1px solid #343536;
    border-radius: 4px;
  }

  .comment-box:focus-within {
    border: 1px solid #a6a6a6;
  }

  .comment-box textarea {
    width: 100%;
    min-height: 122px;
    color: inherit;
    font-size: 14px;
    line-height: 21px;
    background: #1a1a1b;
    padding: 8px 16px;
    border: none;
    outline: none;
    resize: vertical;
  }

  .comment-box-footer {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    background-color: #272729;
  }

  .comment-box-footer button {
    color: #1a1a1b;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    min-height: 24px;
    min-width: 24px;
    background-color: #d7dadc;
    padding: 4px 20px;
    border-radius: 20px;
    margin: 4px 8px;
    cursor: pointer;
  }

  .comment-box-footer button:hover {
    opacity: 0.8;
  } */

  .sort-options-container {
    display: flex;
    padding: 0 16px 4px 0;
    border-bottom: 1px solid #343536;
    margin: 16px 40px 0 48px;
  }

  .sort-options-inner {
    display: flex;
    position: relative;
  }

  .btn-sort {
    color: #4fbcff;
    font-size: 12px;
    font-weight: 700;
    text-transform: capitalize;
    line-height: 24px;
    padding: 4px 8px 4px 0;
    border: none;
    background-color: transparent;
  }
  .sort-options-container img {
    width: 20px;
    filter: invert(65%) sepia(85%) saturate(2330%) hue-rotate(179deg)
      brightness(106%) contrast(101%);
    margin-left: -5px;
  }

  .sort-options {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #1a1a1b;
    border: 1px solid #343536;
    box-shadow: 0 2px 4px 0 #d7dadc33;
  }

  .sort-options button {
    color: #818384;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    padding: 8px;
    text-transform: capitalize;
    cursor: pointer;
  }

  .sort-options button:hover,
  .sort-options button:active {
    color: inherit;
    background-color: #17232d;
  }

  .comments-container {
    padding-right: 16px;
    padding-bottom: 16px;
    margin: 16px 16px 0 10px;
  }
  /* .votes-container {
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
  } */

  @media (min-width: 640px) {
    /* border-radius: 4px;
    padding-left: 40px; */

    .votes-container-row {
      display: none;
    }
  }

  @media (max-width: 639px) {
    & > article {
      padding-left: 40px;
    }

    .votes-container {
      display: none;
    }
  }

  @media (min-width: 960px) {
    max-width: 740px;
  }
`;

export default Post;
