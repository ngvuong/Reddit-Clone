import styled from "styled-components";

function Container({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media (min-width: 640px) {
    padding: 20px 24px;
  }

  @media (min-width: 960px) {
    width: 640px;
  }
`;

export default Container;
