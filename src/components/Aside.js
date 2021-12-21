import styled from "styled-components";

function Aside() {
  return <StyledAside>Aside</StyledAside>;
}

const StyledAside = styled.aside`
  margin: 28px 0 0 24px;
  display: none;
  flex: 0 0 312px;
  width: 312px;

  @media (min-width: 960px) {
    display: block;
  }
`;

export default Aside;
