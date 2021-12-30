import React from "react";
import styled from "styled-components";

function NewCommentBox({ onClick }, ref) {
  return (
    <StyledCommentBox>
      <textarea
        name="comment"
        rows="7"
        placeholder="What are your thoughts?"
        ref={ref}
      ></textarea>

      <div className="comment-box-footer">
        <button onClick={onClick}>Comment</button>
      </div>
    </StyledCommentBox>
  );
}

const StyledCommentBox = styled.div`
  border: 1px solid #343536;
  border-radius: 4px;

  &:focus-within {
    border: 1px solid #a6a6a6;
  }

  & textarea {
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
  }
`;

const ForwardedCommentBox = React.forwardRef(NewCommentBox);

export default ForwardedCommentBox;
