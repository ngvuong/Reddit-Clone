import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import postIcon from "../assets/post-icon.svg";
import imageIcon from "../assets/image-icon.svg";
import linkIcon from "../assets/link-icon.svg";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

function CreatePost({ user }) {
  const navigate = useNavigate();
  const [isTextPost, setIsTextPost] = useState(true);
  const [postType, setPostType] = useState("text");
  const [showError, setShowError] = useState(false);
  const textRef = useRef(null);
  const mediaRef = useRef(null);
  const linkRef = useRef(null);
  const btnRefs = [textRef, mediaRef, linkRef];
  const postBtnRef = useRef(null);

  const resize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  useEffect(() => {
    textRef.current.classList.add("active");
  }, []);

  const onPostClick = (e) => {
    btnRefs.forEach((ref) => ref.current.classList.remove("active"));
    e.currentTarget.classList.add("active");
    setIsTextPost(true);
    setPostType("text");
  };

  const onMediaClick = (e) => {
    btnRefs.forEach((ref) => ref.current.classList.remove("active"));
    e.currentTarget.classList.add("active");
    setIsTextPost(false);
    if (e.target === linkRef.current) {
      setPostType("link");
    } else setPostType("media");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    let body = e.target.elements.body.value || title;
    let src = "";

    // const youtubeRegex =
    //   /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
    // const imgRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g;
    // const urlRegex =
    //   /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

    const youtubeRegex =
      /^https?:\/\/(?:www\.youtube(?:-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*&)?vi?=|&vi?=|\?(?:.*&)?vi?=)([^#&?\n/<>"']*)/i;
    const imgRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g;
    const urlRegex =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
    const urlTrimRegex = /^(?:https?:\/\/)?(?:www\.)?/i;

    if (postType === "media") {
      if (!youtubeRegex.test(body) && !imgRegex.test(body)) {
        console.log("fail both media");
        setShowError(true);
        return;
      }
      if (youtubeRegex.test(body)) {
        const match = body.match(youtubeRegex);
        body = `https://www.youtube.com/embed/${match[1]}`;
        if (match[1].length !== 11) {
          console.log("fail youtube", match[1]);
          setShowError(true);
          return;
        }
      }
    } else if (postType === "link") {
      if (urlRegex.test(body)) {
        body = body.replace(urlTrimRegex, "");
        src = `http://www.${body}`;
      } else {
        console.log("fail link");
        setShowError(true);
        return;
      }
    }

    try {
      postBtnRef.current.disabled = true;
      const doc = await addDoc(collection(getFirestore(), "posts"), {
        user,
        title,
        body,
        src,
        type: postType,
        time: serverTimestamp(),
        comments: [],
        votes: 0,
        voters: {},
        latestComment: null,
      });
      setShowError(false);
      navigate("/");
      console.log("success", doc);
    } catch (err) {
      console.error(err);
    }
  };

  const onCancel = () => {
    navigate("/");
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
        <form className="post-form" onSubmit={onSubmit}>
          <div className="post-fields">
            <div className="title-field">
              <textarea
                name="title"
                maxLength="300"
                placeholder="Title"
                rows="1"
                onInput={resize}
                required
              ></textarea>
            </div>
            <div className="body-field">
              {isTextPost ? (
                <textarea
                  className="text-post"
                  name="body"
                  placeholder="Text (optional)"
                  rows="6"
                  onInput={resize}
                ></textarea>
              ) : (
                <>
                  {showError && (
                    <span className="error">
                      Url needs to be in the correct format for youtube video,
                      image (jpg, gif, png), or link
                    </span>
                  )}
                  <textarea
                    className="url-post"
                    name="body"
                    placeholder="Url"
                    rows="2"
                    onInput={resize}
                    type="url"
                    required
                  ></textarea>
                </>
              )}
            </div>
          </div>
          <hr />
          <div className="footer">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              CANCEL
            </button>
            <button className="btn-post" ref={postBtnRef}>
              POST
            </button>
          </div>
        </form>
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
    background-color: #d7dadc0d;
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

  .error {
    font-size: 14px;
    font-style: italic;
    color: red;
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

  .btn-post:disabled {
    cursor: not-allowed;
    filter: opacity(0.5);
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
