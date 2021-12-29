import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,*::before,*::after {
    box-sizing: border-box;
  }

  body {
    font-family: IBMPlexSans, Arial, sans-serif;
    color: #d7dadc;
    background: #030303;
    margin: 0;
  }

  button {
    background: transparent;
    border: none;
  }
`;

export default GlobalStyles;
