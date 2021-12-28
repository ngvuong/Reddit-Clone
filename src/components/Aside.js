import styled from "styled-components";

function Aside({ width }) {
  return <StyledAside width={width}>Aside</StyledAside>;
}

const StyledAside = styled.aside`
  margin: 28px 0 0 24px;
  display: none;
  flex: 0 0 312px;
  width: 312px;

  @media (min-width: ${({ width }) => width + "px"}) {
    display: block;
  }
`;

export default Aside;
