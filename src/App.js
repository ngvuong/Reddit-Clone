import React, { useState, useEffect } from "react";
import GlobalStyles from "./styles/Global";
import Header from "./components/Header";
import { Overlay } from "./styles/Overlay";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import MainContent from "./components/MainContent";
import Container from "./components/Container";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase/firebase-config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const theme = {
  colors: {
    header: "#1a1a1b",
    modal: "#fff",
    overlay: "rgba(0,0,0,0.4)",
  },
};

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    initializeApp(firebaseConfig);

    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setIsLoggedIn(true);
        console.log(user);
      }
    });
  }, []);
  const onSignout = () => {
    setIsLoggedIn(false);
    signOut(getAuth());
  };
  const onLinkClick = (e) => {
    e.preventDefault();
    setShowLogin(!showLogin);
    setShowSignup(!showSignup);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header
          isLoggedIn={isLoggedIn}
          onSignout={onSignout}
          onLogin={() => setShowLogin(true)}
          onSignup={() => setShowSignup(true)}
        />
        <Container>
          <MainContent />
          <Aside />
          {(showLogin || showSignup) && (
            <Overlay>
              {showLogin && (
                <LoginModal
                  onClose={() => setShowLogin(false)}
                  onLinkClick={onLinkClick}
                />
              )}
              {showSignup && (
                <SignupModal
                  onClose={() => setShowSignup(false)}
                  onLinkClick={onLinkClick}
                />
              )}
            </Overlay>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
