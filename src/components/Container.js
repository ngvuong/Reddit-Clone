import styled from "styled-components";

function Container({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;

  @media (min-width: 640px) {
    padding: 20px 24px;
  }
`;

export default Container;
