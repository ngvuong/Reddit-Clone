import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/Global";
import Header from "./components/Header";
import Home from "./pages/Home";
import Submit from "./pages/Submit";
import Comments from "./pages/Comments";
import { Overlay } from "./styles/Overlay";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
// import MainContent from "./components/MainContent";
// import Container from "./components/Container";
// import Aside from "./components/Aside";
// import CreatePost from "./components/CreatePost";
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

export const PostContext = React.createContext();

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [postData, setPostData] = useState({});
  const [sortBy, setSortBy] = useState("new");

  initializeApp(firebaseConfig);
  useEffect(() => {
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
    setUsername("");
  };

  const onLinkClick = (e) => {
    e.preventDefault();
    setShowLogin(!showLogin);
    setShowSignup(!showSignup);
  };

  const onGetPostData = (postData) => {
    setPostData(postData);
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
        <PostContext.Provider value={onGetPostData}>
          <Routes>
            <Route
              path="/*"
              element={
                <Home
                  isLoggedIn={isLoggedIn}
                  username={username}
                  showLogin={showLogin}
                  showSignup={showSignup}
                  onCloseLogin={() => setShowLogin(false)}
                  onCloseSignup={() => setShowSignup(false)}
                  onLinkClick={onLinkClick}
                  onSort={(option) => setSortBy(option)}
                  sortBy={sortBy}
                />
              }
            />
            {isLoggedIn && (
              <Route path="/submit" element={<Submit username={username} />} />
            )}
            <Route
              path="/comments/:postId"
              element={<Comments postData={postData} username={username} />}
            />
          </Routes>
        </PostContext.Provider>

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
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
