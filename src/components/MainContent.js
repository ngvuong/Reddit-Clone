import PostOptions from "./PostOptions";
import PostCard from "./PostCard";
import styled from "styled-components";

function MainContent() {
  return (
    <StyledMain>
      <div className="section-heading">Popular posts</div>
      <PostOptions />
      <PostCard />
    </StyledMain>
  );
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .section-heading {
    width: 100%;
    padding-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
  }

  @media (min-width: 960px) {
    width: 640px;
  }

  @media (max-width: 639px) {
    .section-heading {
      margin-top: 20px;
    }
  }
`;

export default MainContent;
