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
`;

export default MainContent;
