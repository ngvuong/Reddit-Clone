import React, { useState, useRef } from "react";
import NewCommentBox from "./NewCommentBox";
import styled from "styled-components";
import avatarComment from "../assets/avatar2.png";

function Comment({ commentData, onReply, index }) {
  const [showNewCommentBox, setShowNewCommentBox] = useState(false);
  const replyRef = useRef(null);

  const onSubmit = () => {
    const replyText = replyRef.current.value;
    if (replyText) {
      onReply(replyText, index);
    }
  };

  return (
    <StyledComment level={commentData.level}>
      <div className="comment-container">
        <img src={avatarComment} alt="Reddit alien avatar" />
        <div className="comment">{commentData.text}</div>
        <button onClick={() => setShowNewCommentBox(true)}>Reply</button>
        {showNewCommentBox && (
          <NewCommentBox onClick={onSubmit} showCancel={true} ref={replyRef} />
        )}
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

  & img {
    align-self: flex-start;
    height: 28px;
    width: 28px;
    border-radius: 50%;
    margin-top: 6px;
  }

  .comment {
    margin-left: 8px;
    align-self: flex-start;
    border: 1px solid transparent;
  }
`;

export default Comment;
