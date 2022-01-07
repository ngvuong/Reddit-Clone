import React, { useState, useEffect, useRef } from "react";
import NewCommentBox from "./NewCommentBox";
import { formatDistance } from "date-fns";
import styled from "styled-components";
import avatarComment from "../assets/avatar2.png";
import upvoteIcon from "../assets/upvote-icon.svg";
import downvoteIcon from "../assets/downvote-icon.svg";
import commentIcon from "../assets/comment-icon.svg";

import { getFirestore, doc, updateDoc } from "firebase/firestore";

function Comment({ commentData, postData, onReply, index, username }) {
  const [showNewCommentBox, setShowNewCommentBox] = useState(false);
  const [update, setUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const replyRef = useRef(null);
  // Permit comment author to delete
  useEffect(() => {
    if (username === commentData.user) {
      setShowDelete(true);
    }
  }, [commentData, username]);

  const onSubmit = () => {
    const replyText = replyRef.current.value;
    if (replyText) {
      onReply(replyText, index);
      setShowNewCommentBox(false);
    }
  };
  // Update comments array in db
  const updateComment = async () => {
    const comments = postData.comments;
    if (comments[index]) {
      comments[index].votes = commentData.votes;
      comments[index].voters = commentData.voters;
    }

    setUpdate(!update);
    const postRef = doc(getFirestore(), "posts", postData.id);
    await updateDoc(postRef, { comments });
  };
  // Track votes and voters on per user basis
  const onUpvote = () => {
    if (username) {
      if (!commentData.voters[username] || commentData.voters[username] !== 1) {
        commentData.votes++;
        if (commentData.voters[username] === -1) {
          commentData.voters[username] = 0;
        } else {
          commentData.voters[username] = 1;
        }
        updateComment();
      }
    }
  };

  const onDownvote = () => {
    if (username) {
      if (commentData.votes > 0) {
        if (
          !commentData.voters[username] ||
          commentData.voters[username] !== -1
        ) {
          commentData.votes--;
          if (commentData.voters[username] === 1) {
            commentData.voters[username] = 0;
          } else {
            commentData.voters[username] = -1;
          }
          updateComment();
        }
      }
    }
  };

  const onDelete = () => {
    if (window.confirm("Delete comment permanently?")) {
      commentData.user = "[deleted]";
      commentData.text = "[deleted]";
      postData.comments[index] = commentData;
      updateComment();
    }
  };
  // Comments and replies indented based on level of nesting
  return (
    <StyledComment level={commentData.level}>
      <div className="comment-container">
        <img
          className="avatar-icon"
          src={avatarComment}
          alt="Reddit alien avatar"
        />
        <div className="comment">
          <div className="comment-head">
            {commentData.user} <span className="middle-dot"> &middot;</span>{" "}
            <span>
              {formatDistance(new Date(commentData.time), new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
          <div className="comment-body">{commentData.text}</div>
          <div className="comment-footer">
            <div className="votes-container">
              <button onClick={onUpvote}>
                <img src={upvoteIcon} alt="Up arrow" />
              </button>
              <div className="votes">{commentData.votes}</div>
              <button onClick={onDownvote}>
                <img src={downvoteIcon} alt="Down arrow" />
              </button>
            </div>
            <button
              className="btn-reply"
              onClick={() => setShowNewCommentBox(true)}
            >
              <img src={commentIcon} alt="Comment bubble" />
              <span>Reply</span>
            </button>
            {showDelete && (
              <button className="btn-delete" onClick={onDelete}>
                Delete
              </button>
            )}
          </div>
          {showNewCommentBox && (
            <div className="reply-box-container">
              <NewCommentBox
                btnText="Reply"
                onClick={onSubmit}
                onCancel={() => setShowNewCommentBox(false)}
                showCancel={true}
                ref={replyRef}
              />
            </div>
          )}
        </div>
      </div>
    </StyledComment>
  );
}

const StyledComment = styled.div`
  padding: 8px 0 0 16px;
  padding-left: ${({ level }) =>
    level === 0 ? 16 + "px" : 16 + level * 21 + "px"};
  margin-top: ${({ level }) => (level === 0 ? 16 + "px" : 0)};
  margin-left: -23px;

  .comment-container {
    display: flex;
    align-items: center;
    padding-left: 8px;
  }

  .avatar-icon {
    align-self: flex-start;
    height: 28px;
    width: 28px;
    border-radius: 50%;
    margin-top: 6px;
  }

  .comment {
    width: 100%;
    margin-left: 8px;
    border: 1px solid transparent;
  }

  .comment-head {
    display: flex;
    align-items: center;
    margin: 10px 0 6px;
    min-height: 18px;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
  }

  .comment-head span {
    color: #818384;
    font-weight: 400;
    line-height: 18px;
  }

  .middle-dot {
    margin: 0 4px;
  }

  .comment-body {
    padding: 2px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .comment-footer {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
  }

  .votes-container {
    display: flex;
    align-items: center;
    padding: 0 2px;
  }

  .votes-container .votes {
    margin: 4px;
  }

  .votes-container button {
    padding: 0;
  }

  .votes-container img {
    width: 20px;
    height: 20px;
    filter: invert(58%) sepia(6%) saturate(98%) hue-rotate(155deg)
      brightness(88%) contrast(85%);
  }

  .votes-container img:hover {
    filter: invert(25%) sepia(84%) saturate(5974%) hue-rotate(23deg)
      brightness(97%) contrast(101%);
  }

  .btn-reply {
    display: flex;
    align-items: center;
    color: #818384;
    padding: 0 4px 6px 4px;
  }

  .btn-reply:hover,
  .btn-delete:hover {
    background-color: #d7dadc1a;
  }

  .btn-reply img {
    filter: invert(58%) sepia(6%) saturate(98%) hue-rotate(155deg)
      brightness(88%) contrast(85%);
    margin-right: 6px;
  }

  .reply-box-container {
    margin: 16px 0 16px 22px;
  }

  .btn-delete {
    color: #818384;
    padding: 0 4px 6px 4px;
  }
`;

export default Comment;
