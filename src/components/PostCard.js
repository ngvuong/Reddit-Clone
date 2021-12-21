import styled from "styled-components";
import upvoteIcon from "../assets/upvote-icon.svg";
import downvoteIcon from "../assets/downvote-icon.svg";
import commentIcon from "../assets/comment-icon.svg";

function PostCard() {
  return (
    <StyledPostCard>
      <div className="votes-container">
        <button>
          <img src={upvoteIcon} alt="Up arrow" />
        </button>
        <div className="votes">0</div>
        <button>
          <img src={downvoteIcon} alt="Down arrow" />
        </button>
      </div>
      <div className="post">
        <div className="post-header">
          r/reddit
          <span className="poster">Posted by </span>
        </div>
        <h3 className="post-title">Testing Title</h3>
        <div className="post-body">
          <p>testing body</p>
        </div>
        <div className="post-footer">
          <a href="/comments/">
            <img src={commentIcon} alt="Comment bubble" />
            <span>Comments</span>
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
  z-index: -1;

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

  .votes-container button {
    background-color: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
  }

  .votes-container img {
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

  .post-footer {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    padding: 0 10px 0 4px;
  }

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #818384;
    padding: 8px;
  }

  .post-footer img {
    margin-right: 6px;
    filter: invert(58%) sepia(6%) saturate(98%) hue-rotate(155deg)
      brightness(88%) contrast(85%);
  }

  @media (min-width: 640px) {
    border-radius: 4px;
    padding-left: 40px;
  }
`;

export default PostCard;
