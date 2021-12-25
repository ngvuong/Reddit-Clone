import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import postIcon from "../assets/post-icon.svg";
import imageIcon from "../assets/image-icon.svg";
import linkIcon from "../assets/link-icon.svg";

function CreatePost() {
  const [showTextPost, setShowTextPost] = useState(true);
  const textRef = useRef(null);
  const mediaRef = useRef(null);
  const linkRef = useRef(null);
  const btnRefs = [textRef, mediaRef, linkRef];

  const resize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  useEffect(() => {
    textRef.current.classList.add("active");
  }, []);

  const onPostClick = (e) => {
    btnRefs.forEach((ref) => ref.current.classList.remove("active"));
    e.target.classList.add("active");
    setShowTextPost(true);
  };

  const onMediaClick = (e) => {
    btnRefs.forEach((ref) => ref.current.classList.remove("active"));
    e.target.classList.add("active");
    setShowTextPost(false);
  };

  return (
    <StyledCreatePost>
      <div className="heading-section">Create a post</div>

      <div className="post-section">
        <div className="options-panel">
          <button className="btn-option" onClick={onPostClick} ref={textRef}>
            <img src={postIcon} alt="Paper icon" /> Post
          </button>
          <button className="btn-option" onClick={onMediaClick} ref={mediaRef}>
            <img src={imageIcon} alt="Drawing icon" />
            Images &amp; Video
          </button>
          <button className="btn-option" onClick={onMediaClick} ref={linkRef}>
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
            {showTextPost ? (
              <textarea
                className="text-post"
                name="body"
                placeholder="Text (optional)"
                rows="6"
                onInput={resize}
              ></textarea>
            ) : (
              <textarea
                className="url-post"
                name="url-body"
                placeholder="Url"
                rows="2"
                onInput={resize}
              ></textarea>
            )}
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
    padding: 4px 4px 16px;
    border-bottom: 1px solid #343536;
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

  .btn-option.active {
    color: inherit;
    border-bottom: 2px solid #d7dadc;
  }

  .btn-option.active img {
    filter: invert(96%) sepia(8%) saturate(70%) hue-rotate(161deg)
      brightness(93%) contrast(87%);
  }

  .btn-option:hover {
    background-color: #d7dadc0d;
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

  .body-field .text-post {
    min-height: 122px;
    resize: vertical;
  }

  .body-field .url-post {
    min-height: 66px;
    resize: none;
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
    cursor: pointer;
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
