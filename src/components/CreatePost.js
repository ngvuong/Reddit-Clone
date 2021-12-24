import styled from "styled-components";

function CreatePost() {
  return (
    <StyledCreatePost>
      <div className="heading-section">Create a post</div>

      <div className="post-section">
        <div className="options-panel">
          <button>Post</button>
          <button>Images &amp; Video</button>
          <button>Link</button>
        </div>
        <div className="title-field"></div>
        <div className="body-field"></div>
        <div className="footer"></div>
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

  .heading-section {
    width: 100%;
    font-size: 18px;
    line-height: 22px;
  }

  .post-section @media (min-width: 960px) {
    .mYMRz {
      width: 640px;
    }
  }
`;

export default CreatePost;
