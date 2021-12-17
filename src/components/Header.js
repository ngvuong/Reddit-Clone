import styled from "styled-components";

function Header() {
  return <StyledHeader />;
}

export default Header;

const StyledHeader = styled.header`
  height: 48px;
  position: sticky;
  background-color: ${({ theme }) => theme.colors.header};
`;
