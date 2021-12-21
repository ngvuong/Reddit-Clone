import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,*::before,*::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: #030303;
    color: #d7dadc;
  }
`;

export default GlobalStyles;
