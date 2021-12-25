import React, { useRef } from "react";
import styled from "styled-components";

function CreatePost() {
  const titleRef = useRef(null);

  const resize = () => {
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
  };

  return (
    <StyledCreatePost>
      <div className="heading-section">Create a post</div>

      <div className="post-section">
        <div className="options-panel">
          <button className="btn-option">Post</button>
          <button className="btn-option">Images &amp; Video</button>
          <button className="btn-option">Link</button>
        </div>
        <div className="post-fields">
          <div className="title-field">
            <textarea
              name="title"
              maxLength="300"
              placeholder="Title"
              rows="1"
              ref={titleRef}
              onInput={resize}
            ></textarea>
          </div>
          <div className="body-field">
            <textarea
              name="body"
              placeholder="Text (optional)"
              rows="6"
            ></textarea>
          </div>
        </div>
        <hr />
        <div className="footer">
          <button className="btn-cancel">CANCEL</button>
          <button className="btn-post">POST</button>
        </div>
      </div>
    </StyledCreatePost>
  );
}

const StyledCreatePost = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1 1 100%;

  .heading-section {
    width: 100%;
    font-size: 18px;
    line-height: 22px;
    font-weight: 500;
    padding: 4px;
    margin: 16px 0;
  }

  .post-section {
    width: 100%;
    background-color: #1a1a1b;
    border-radius: 5px;
  }

  .options-panel {
    display: flex;
    width: 100%;
    margin: 0 0 12px;
  }

  .btn-option {
    flex: 1;
  }

  .post-fields {
    margin: 16px;
  }

  .title-field {
    margin-bottom: 8px;
  }

  .title-field textarea {
    width: 100%;
    min-height: 39px;
    color: inherit;
    font-size: 14px;
    padding: 8px 16px;
    border: 1px solid #343536;
    border-radius: 4px;
    background-color: transparent;
    resize: none;
    overflow: hidden;
  }

  .body-field textarea {
    width: 100%;
    min-height: 122px;
    color: inherit;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: transparent;
    resize: vertical;
  }

  hr {
    border: 1px solid #343536;
    margin: 8px 16px;
  }

  .footer {
    display: flex;
    flex-direction: row-reverse;
    padding-top: 8px;
  }

  .footer button {
    font-size: 14px;
    font-weight: 700;
    padding: 4px 16px;
    border-radius: 100px;
  }

  .btn-cancel {
    margin-left: 8px;
    background-color: transparent;
    color: #d7dadc80;
    border: 1px solid #d7dadc80;
  }

  .btn-post {
    color: #1a1a1b80;
    border: none;

    background: #dfe1e3;
  }

  @media (min-width: 960px) {
    width: 640px;
    max-width: 740px;
  }

  @media (max-width: 960px) {
    padding: 0 8px;
  }
`;

export default CreatePost;
