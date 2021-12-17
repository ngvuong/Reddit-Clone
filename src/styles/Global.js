import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,*::before,*::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: #dae0e6;
  }
`;

export default GlobalStyles;
