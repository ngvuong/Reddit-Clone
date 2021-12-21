import PostOptions from "./PostOptions";
import styled from "styled-components";

function MainContent() {
  return (
    <StyledMain>
      <div className="section-heading">Popular posts</div>
      <PostOptions />
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
    font-weight: 500;
  }

  @media (min-width: 960px) {
    width: 640px;
  }
`;

export default MainContent;
