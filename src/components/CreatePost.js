import React from "react";
import styled from "styled-components";
import postIcon from "../assets/post-icon.svg";
import imageIcon from "../assets/image-icon.svg";
import linkIcon from "../assets/link-icon.svg";

function CreatePost() {
  const resize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <StyledCreatePost>
      <div className="heading-section">Create a post</div>

      <div className="post-section">
        <div className="options-panel">
          <button className="btn-option">
            <img src={postIcon} alt="Paper icon" /> Post
          </button>
          <button className="btn-option">
            <img src={imageIcon} alt="Drawing icon" />
            Images &amp; Video
          </button>
          <button className="btn-option">
            <img src={linkIcon} alt="Link icon" />
            Link
          </button>
        </div>
        <div className="post-fields">
          <div className="title-field">
            <textarea
              name="title"
              maxLength="300"
              placeholder="Title"
              rows="1"
              onInput={resize}
            ></textarea>
          </div>
          <div className="body-field">
            <textarea
              name="body"
              placeholder="Text (optional)"
              rows="6"
              onInput={resize}
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
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    color: #818384;
    font-size: 14px;
    font-weight: 700;
    background: none;
    padding: 15px 17px;
    border-style: solid;
    border-width: 0 1px 1px 0;
    border-color: #343536;
    cursor: pointer;
  }

  .btn-option img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    filter: invert(59%) sepia(6%) saturate(102%) hue-rotate(155deg)
      brightness(87%) contrast(85%);
  }

  .post-fields {
    margin: 16px;
  }

  .title-field {
    margin-bottom: 8px;
  }

  .post-fields textarea {
    width: 100%;
    color: inherit;
    font-size: 14px;
    padding: 8px 16px;
    border: 1px solid #343536;
    border-radius: 4px;
    background-color: transparent;
    overflow: hidden;
  }

  .title-field textarea {
    min-height: 39px;
    resize: none;
  }

  .body-field textarea {
    min-height: 122px;
    resize: vertical;
  }

  hr {
    border: 1px solid #343536;
    margin: 8px 16px;
  }

  .footer {
    display: flex;
    flex-direction: row-reverse;
    padding: 8px 16px 16px;
  }

  .footer button {
    min-height: 32px;
    font-size: 14px;
    font-weight: 700;
    padding: 4px 16px;
    border-radius: 100px;
  }

  .btn-cancel {
    margin-left: 8px;
    background-color: transparent;
    color: #d7dadc;
    border: 1px solid #d7dadc;
  }

  .btn-post {
    color: #1a1a1b;
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
