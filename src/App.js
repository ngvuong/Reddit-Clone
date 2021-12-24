import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/Global";
import Header from "./components/Header";
import Home from "./pages/Home";
// import { Overlay } from "./styles/Overlay";
// import LoginModal from "./components/LoginModal";
// import SignupModal from "./components/SignupModal";
// import MainContent from "./components/MainContent";
// import Container from "./components/Container";
// import Aside from "./components/Aside";
// import CreatePost from "./components/CreatePost";
import Submit from "./pages/Submit";
import { ThemeProvider } from "styled-components";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase/firebase-config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getFirestore, getDoc } from "firebase/firestore";

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
  const [username, setUsername] = useState("");

  useEffect(() => {
    initializeApp(firebaseConfig);

    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        console.log(user);
        setIsLoggedIn(true);
        const docRef = doc(getFirestore(), "usernames", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUsername(docSnap.data().username);
        }
      } else {
        console.log("logged out");
      }
    });
  }, []);

  const onSignout = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    signOut(getAuth());
  };

  const onLinkClick = (e) => {
    e.preventDefault();
    setShowLogin(!showLogin);
    setShowSignup(!showSignup);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header
          username={username}
          isLoggedIn={isLoggedIn}
          onSignout={onSignout}
          onLogin={() => setShowLogin(true)}
          onSignup={() => setShowSignup(true)}
        />
        {/* <Container>
          <MainContent isLoggedIn={isLoggedIn} />
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
        </Container> */}
      </ThemeProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              showLogin={showLogin}
              showSignup={showSignup}
              onCloseLogin={() => setShowLogin(false)}
              onCloseSignup={() => setShowSignup(false)}
              onLinkClick={onLinkClick}
            />
          }
        />
        <Route path="/submit" element={<Submit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
