import React, { useState, useEffect, useRef } from "react";
import PostCard from "./PostCard";
import Comment from "./Comment";
import NewCommentBox from "./NewCommentBox";
import styled from "styled-components";
import arrowIcon from "../assets/arrow-icon.svg";

import { getFirestore, doc, updateDoc } from "firebase/firestore";

function Post({ postData, username }) {
  const [showOptions, setShowOptions] = useState(false);
  const [sortOption, setSortOption] = useState("top");
  const [commentData, setCommentData] = useState(postData.comments);
  const [latestComment, setLatestComment] = useState(postData.latestComment);
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
    postData.comments = commentData;
    console.log("changed");
    const postRef = doc(getFirestore(), "posts", postData.id);
    updateDoc(postRef, { comments: commentData, latestComment });
  }, [commentData, postData, latestComment]);

  useEffect(() => {
    if (sortOption === "top") {
      // const sortedComments = commentData.sort((a, b) => b.votes - a.votes);
      // console.log(sortedComments);
      console.log(commentData);
      setCommentData((prevData) => prevData.sort((a, b) => b.votes - a.votes));
    }
  }, [sortOption, commentData]);

  const onComment = () => {
    const commentText = commentRef.current.value;
    if (commentText) {
      const time = Date.now();
      setCommentData((prevData) => [
        ...prevData,
        {
          user: username,
          level: 0,
          text: commentText,
          votes: 0,
          voters: {},
          replies: [],
          time,
        },
      ]);
      setLatestComment(time);
    }

    commentRef.current.value = "";
  };

  const onReply = (replyText, index) => {
    setCommentData((prevData) => {
      const targetComment = prevData[index];
      const time = Date.now();
      const replyData = {
        user: username,
        level: targetComment.level + 1,
        text: replyText,
        votes: 0,
        voters: {},
        replies: [],
        time,
      };
      setLatestComment(time);
      targetComment.replies.push(replyData);
      const data = [...prevData];
      data.splice(index + 1, 0, replyData);
      return data;
    });
  };
  const comments = commentData.map((comment, i) => (
    <Comment
      key={postData.id + i}
      commentData={comment}
      postData={postData}
      index={i}
      onReply={onReply}
      username={username}
    />
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
          btnText="Comment"
          onClick={onComment}
          showCancel={false}
          ref={commentRef}
        />
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

  .btn-comments:hover {
    background: none;
    cursor: default;
  }

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
