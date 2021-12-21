import PostOptions from "./PostOptions";
import styled from "styled-components";

function MainContent() {
  return (
    <StyledMain>
      <div>Popular posts</div>
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

  div {
    width: 100%;
  }

  @media (min-width: 640px) {
    padding: 20px 24px;
  }

  @media (min-width: 960px) {
    width: 640px;
  }
`;

export default MainContent;
