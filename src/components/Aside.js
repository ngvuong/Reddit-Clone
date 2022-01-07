import styled from "styled-components";

function Aside({ media, mt, ml }) {
  return (
    <StyledAside media={media} mt={mt} ml={ml}>
      <div>
        <h3>Reddit Clone</h3>
        <p>
          Welcome to Reddit! Share something of your own or check out other
          interesting posts. Reddit Clone was made as part of The Odin Project
          curriculum's final javascrip project. As a learning experience, this
          was challenging while also great fun to build. Check out my{" "}
          <a href="https://github.com/ngvuong" target="_blank" rel="noreferrer">
            Github
          </a>{" "}
          for more information on this and other projects.
        </p>
      </div>
      <div>
        <h3>Tech Stack</h3>
        <ul>
          <li>React</li>
          <li>Styled Components</li>
          <li>Firebase Auth/Firestore</li>
        </ul>
      </div>
    </StyledAside>
  );
}

const StyledAside = styled.aside`
  display: none;
  flex: 0 0 312px;
  width: 312px;
  height: max-content;
  background-color: #1a1a1b;
  border: 1px solid #474748;
  border-radius: 4px;
  margin-top: ${({ mt }) => mt + "px"};
  margin-left: ${({ ml }) => ml + "px"};

  div {
    font-size: 14px;
    padding: 8px;
  }

  h3 {
    margin-top: 8px;
  }

  a {
    text-decoration: none;
    color: #4fbcff;
  }

  @media (min-width: ${({ media }) => media + "px"}) {
    display: block;
  }
`;

export default Aside;
