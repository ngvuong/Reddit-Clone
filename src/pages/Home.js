import Container from "../components/Container";
import { Overlay } from "../styles/Overlay";
import MainContent from "../components/MainContent";
import Aside from "../components/Aside";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

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
      <Aside />
      {(showLogin || showSignup) && (
        <Overlay>
          {showLogin && (
            <LoginModal onClose={onCloseLogin} onLinkClick={onLinkClick} />
          )}
          {showSignup && (
            <SignupModal onClose={onCloseSignup} onLinkClick={onLinkClick} />
          )}
        </Overlay>
      )}
    </Container>
  );
}

export default Home;
