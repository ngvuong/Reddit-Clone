import styled from "styled-components";
import upvoteIcon from "../assets/upvote-icon.svg";
import downvoteIcon from "../assets/downvote-icon.svg";
import commentIcon from "../assets/comment-icon.svg";

function PostCard({ data }) {
  return (
    <StyledPostCard>
      <div className="votes-container">
        <button>
          <img src={upvoteIcon} alt="Up arrow" />
        </button>
        <div className="votes">{data.vote ? data.vote : "Vote"}</div>
        <button>
          <img src={downvoteIcon} alt="Down arrow" />
        </button>
      </div>
      <div className="post">
        <div className="post-header">
          r/reddit
          <span className="poster">Posted by {data.user}</span>
        </div>
        <h3 className="post-title">{data.title}</h3>
        <div className="post-body">
          {data.type === "text" ? (
            <p>{data.body}</p>
          ) : data.body.includes("youtu") ? (
            <iframe src={data.body} title="{data.title}"></iframe>
          ) : (
            <img src={data.body} alt={data.title}></img>
          )}
        </div>
        <div className="post-footer">
          <div className="votes-container-row">
            <button>
              <img src={upvoteIcon} alt="Up arrow" />
            </button>
            <div className="votes">{data.vote ? data.vote : "Vote"}</div>
            <button>
              <img src={downvoteIcon} alt="Down arrow" />
            </button>
          </div>
          <a href="/comments/">
            <img src={commentIcon} alt="Comment bubble" />
            <span>{data.comments.length} Comments</span>
          </a>
        </div>
      </div>
    </StyledPostCard>
  );
}

const StyledPostCard = styled.article`
  position: relative;
  width: 100%;
  color: #d7dadc;
  background-color: rgba(26, 26, 27, 0.8);
  border: 1px solid #343536;
  margin-bottom: 10px;

  .votes-container {
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
  }

  .post {
    padding-top: 8px;
  }

  .post-header {
    color: #d7dadc;
    font-size: 12px;
    line-height: 16px;
    margin: 0 8px 8px;
  }

  .poster {
    margin-left: 8px;
    color: #818384;
    margin-right: 3px;
  }

  .post-title {
    margin: 0 8px;
    font-size: 18px;
  }

  .post-body {
    display: flex;
    justify-content: center;
    mask-image: linear-gradient(180deg, #000 60%, transparent);
    padding: 5px 8px 10px;
    margin-top: 8px;
    background: #1a1a1b;
  }

  .post-body img {
    max-height: 512px;
    max-width: 100%;
  }

  .post-footer {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    padding: 0 10px 0 4px;
  }

  .post-footer .votes {
    margin: 0 1px;
    width: 32px;
    text-align: center;
  }

  .post-footer a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #818384;
    padding: 8px;
  }

  .post-footer a img {
    margin-right: 6px;
    filter: invert(58%) sepia(6%) saturate(98%) hue-rotate(155deg)
      brightness(88%) contrast(85%);
  }

  @media (min-width: 640px) {
    border-radius: 4px;
    padding-left: 40px;

    .votes-container-row {
      display: none;
    }
  }

  @media (max-width: 639px) {
    .votes-container {
      display: none;
    }
  }
`;

export default PostCard;
