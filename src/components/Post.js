import styled from "styled-components";

function Post() {
  return <StyledPost>Hello from Comments</StyledPost>;
}

const StyledPost = styled.main`
  position: relative;
  width: 100%;
  background: #1a1a1b;
  padding: 8px 0 0 40px;
  border-radius: 4px;
  margin: 32px 12px 32px 32px;

  @media (min-width: 960px) {
    max-width: 740px;
  }
`;

export default Post;
