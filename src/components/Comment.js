import React, { useState, useRef } from "react";
import NewCommentBox from "./NewCommentBox";
import styled from "styled-components";

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
    <>
      {/* {commentData.level === 1 ? (
        <StyledComment>{commentData.text}</StyledComment>
      ) : null} */}
      <StyledComment level={commentData.level}>
        {commentData.text}
        <button onClick={() => setShowNewCommentBox(true)}>Reply</button>
        {showNewCommentBox && (
          <NewCommentBox onClick={onSubmit} ref={replyRef} />
        )}
      </StyledComment>
    </>
  );
}

const StyledComment = styled.div`
  margin-top: ${({ level }) => (level === 1 ? 16 + "px" : 0)};
  padding: 8px 0 0 16px;
  padding-left: ${({ level }) => level * 16 + "px"};
`;

// const StyledReply = styled.div`
//   padding-left: ${({ level }) => level * 16 + "px"};
// `;

export default Comment;
