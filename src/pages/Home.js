import Container from "../components/Container";
import MainContent from "../components/MainContent";
import Aside from "../components/Aside";

function Home({ isLoggedIn, username, sortBy, onSort }) {
  return (
    <Container>
      <MainContent
        isLoggedIn={isLoggedIn}
        username={username}
        sortBy={sortBy}
        onSort={onSort}
      />
      <Aside media="960" mt={isLoggedIn ? 0 : 28} ml="24" />
    </Container>
  );
}

export default Home;
