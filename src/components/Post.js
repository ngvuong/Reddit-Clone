import styled from "styled-components";

function Post({ postData }) {
  console.log(postData);
  return (
    <StyledPost>
      {/* <div className="votes-container">
        <button onClick={onUpvote}>
          <img src={upvoteIcon} alt="Up arrow" />
        </button>
        <div className="votes">{votes ? votes : "Vote"}</div>
        <button onClick={onDownvote}>
          <img src={downvoteIcon} alt="Down arrow" />
        </button>
      </div> */}
    </StyledPost>
  );
}

const StyledPost = styled.main`
  position: relative;
  width: 100%;
  max-width: 740px;
  background: #1a1a1b;
  padding: 8px 0 0 40px;
  border-radius: 4px;
  margin: 32px 12px 32px 32px;

  /* @media (min-width: 960px) {
    max-width: 740px;
  } */
`;

export default Post;
