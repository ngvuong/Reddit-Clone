import GlobalStyles from "./styles/Global";
import Header from "./components/Header";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    header: "#FFF",
  },
};

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
      </ThemeProvider>
    </div>
  );
}

export default App;
