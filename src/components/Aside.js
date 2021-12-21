import styled from "styled-components";

function Aside() {
  return <StyledAside>Aside</StyledAside>;
}

const StyledAside = styled.div`
  margin: 28px 0 0 24px;
  display: none;

  @media (min-width: 960px) {
    display: block;
  }
`;

export default Aside;
