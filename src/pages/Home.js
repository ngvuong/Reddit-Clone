import Container from "../components/Container";
import MainContent from "../components/MainContent";
import Aside from "../components/Aside";

function Home({
  isLoggedIn,
  showLogin,
  showSignup,
  onCloseLogin,
  onCloseSignup,
  onLinkClick,
}) {
  return (
    <Container>
      <MainContent isLoggedIn={isLoggedIn} />
      <Aside width="960" />
      {/* {(showLogin || showSignup) && (
        <Overlay>
          {showLogin && (
            <LoginModal onClose={onCloseLogin} onLinkClick={onLinkClick} />
          )}
          {showSignup && (
            <SignupModal onClose={onCloseSignup} onLinkClick={onLinkClick} />
          )}
        </Overlay>
      )} */}
    </Container>
  );
}

export default Home;
