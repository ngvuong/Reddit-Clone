import GlobalStyles from "./styles/Global";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Container from "./components/Container";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    header: "#1a1a1b",
  },
};

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <Container>
          <MainContent />
          <Aside />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
