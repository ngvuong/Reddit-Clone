import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/logo.svg";
import reddit from "../assets/reddit.svg";
import search from "../assets/search.png";
import userIcon from "../assets/user-icon.svg";
import loginIcon from "../assets/login-icon.svg";
import logoutIcon from "../assets/logout-icon.svg";
import plusIcon from "../assets/plus-icon.svg";
import avatar from "../assets/avatar.svg";

import { getFirestore, query, getDocs, collection } from "firebase/firestore";

function Header({
  onLogin,
  onSignup,
  onSignout,
  username,
  isLoggedIn,
  getPostData,
}) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  // Update stale posts state
  useEffect(() => {
    if (showSearch) {
      (async function fetchPosts() {
        const searchQuery = query(collection(getFirestore(), "posts"));
        const querySnapshot = await getDocs(searchQuery);
        const postData = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          docData.id = doc.id;
          postData.push(docData);
        });
        setPosts(postData);
      })();
    }
  }, [showSearch]);

  useEffect(() => {
    const closeSearch = () => {
      if (showSearch) {
        setShowSearch(false);
      }
    };
    document.addEventListener("click", closeSearch);

    return () => document.removeEventListener("click", closeSearch);
  }, [showSearch]);

  useEffect(() => {
    const closeDropdown = () => {
      if (showDropdown) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => document.removeEventListener("click", closeDropdown);
  }, [showDropdown]);

  const onLoginClick = (e) => {
    e.preventDefault();
    onLogin();
  };

  const onSignupClick = (e) => {
    e.preventDefault();
    onSignup();
  };
  // Search posts based on matches with title, body, and comments
  const onSearch = () => {
    setShowSearch(true);
    const matches = [];
    const searchText = searchRef.current.value;
    const titles = posts.map((post) => post.title);
    const bodies = posts.map((post) => post.body);
    const commentArr = posts.map((post) =>
      post.comments.map((comment) => comment.text)
    );

    titles.forEach((title, i) =>
      title.includes(searchText) ? matches.push(posts[i]) : null
    );
    bodies.forEach((body, i) => {
      if (body.includes(searchText) && !matches.includes(posts[i])) {
        matches.push(posts[i]);
      }
    });
    commentArr.forEach((arr, i) =>
      arr.forEach((comment) => {
        if (comment.includes(searchText) && !matches.includes(posts[i])) {
          matches.push(posts[i]);
        }
      })
    );
    setFilteredPosts(matches);
  };
  // Route to post from search results
  const onRoute = (postData) => {
    searchRef.current.value = "";
    getPostData(postData);
    navigate(`/comments/${postData.id}`);
  };

  const results = filteredPosts.map((post, i) => {
    return (
      <div key={i} className="search-result" onClick={() => onRoute(post)}>
        {post.title}
      </div>
    );
  });

  return (
    <StyledHeader>
      <div className="header-container">
        <div className="header-left-container">
          <Link to="/" className="header-link">
            <img src={logo} alt="Reddit logo" />
            <img src={reddit} alt="Reddit" />
          </Link>
          <div className="search-container-outer">
            <div className="search-container-inner">
              <form>
                <label htmlFor="search-input">
                  <div>
                    <img src={search} alt="search icon" />
                  </div>
                </label>
                <input
                  type="text"
                  id="search-input"
                  placeholder="Search Reddit"
                  onInput={onSearch}
                  autoComplete="off"
                  ref={searchRef}
                />
              </form>
              {showSearch && (
                <div className="results-container">
                  {results.length ? results : "No results found"}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="account-configs">
          <div className="account-configs-inner">
            {!isLoggedIn && (
              <div className="account-login">
                <a
                  href=" /login"
                  onClick={onLoginClick}
                  className="btn-login btn-account header-link"
                >
                  Log In
                </a>
                <a
                  href=" /signup"
                  onClick={onSignupClick}
                  className="btn-signup btn-account header-link"
                >
                  Sign Up
                </a>
              </div>
            )}
            <div className="settings-drop-down">
              <div>
                <button
                  onClick={() => setShowDropdown(true)}
                  className="btn-settings"
                >
                  <span className="settings-wrapper">
                    <span>
                      <img src={userIcon} alt="User icon" />
                    </span>
                    <span className="down-arrow">&#8964;</span>
                  </span>
                </button>
              </div>
              {showDropdown && (
                <div className="dropdown-menu">
                  {!isLoggedIn ? (
                    <a href="/login" onClick={onLoginClick}>
                      <img src={loginIcon} alt="Login icon" />
                      Login / Sign Up
                    </a>
                  ) : (
                    <div className="options">
                      <span>
                        <img src={avatar} alt="Reddit avatar" />
                        {username}
                      </span>
                      <Link to="/submit">
                        <img src={plusIcon} alt="Plus icon" />
                        Create post
                      </Link>
                      <a href="/logout" onClick={onSignout}>
                        <img src={logoutIcon} alt="Logout icon" />
                        Log out
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  height: 3rem;
  position: sticky;
  top: 0;
  flex: 0;
  z-index: 1;

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    width: 100%;
    padding: 0 1.25rem;
    border-bottom: 1px solid rgb(52, 53, 54);
    background-color: ${({ theme }) => theme.colors.header};
  }

  .header-left-container {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  .search-container-outer {
    flex-grow: 1;
    margin: 0 auto;
    max-width: 690px;
  }

  .search-container-inner {
    position: relative;
    fill: rgb(215, 218, 220);
    flex-grow: 1;
    width: auto;
    height: auto;
    margin: 0 1rem;
  }

  .header-link {
    display: flex;
    align-items: center;
  }

  .search-container-inner form {
    display: flex;
    height: 36px;
    background-color: rgb(39, 39, 41);
    border: 1px solid rgb(52, 53, 54);
    border-radius: 4px;
  }

  .search-container-inner form:hover,
  .search-container-inner form:focus-within {
    border: 1px solid rgb(215, 218, 220);
  }

  #search-input {
    width: 100%;
    color: rgb(215, 218, 220);
    font-size: 14px;
    background-color: rgb(39, 39, 41);
    padding: 0;
    border: none;
    margin-right: 1rem;
    outline: none;
    line-height: 14px;
  }

  .search-container-inner label {
    display: flex;
  }

  .search-container-inner label > div {
    display: flex;
    align-items: center;
    padding: 0 9px 0 15px;
  }

  .search-container-inner label img {
    width: 20px;
    height: 20px;
  }

  .header-link > img:first-child {
    width: 3rem;
    height: 3rem;
    padding: 0.5rem 0.5rem 0.5rem 0;
  }

  .header-link > img:last-child {
    display: none;
    width: auto;
    height: 18px;
    margin-right: 20px;
    padding: 0;
  }

  .results-container {
    width: 100%;
    max-height: 500px;
    position: absolute;
    background-color: #1a1a1b;
    padding-bottom: 16px;
    padding-left: 16px;
    border: 1px solid #343536;
    border-top: 0 solid #343536;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 2px 4px 0 #d7dadc33;
    margin-top: 7px;
    overflow: auto;
  }

  .search-result {
    padding: 12px 16px 6px 0;
  }

  .search-result:hover {
    background-color: #272729;
  }

  .account-configs-inner {
    display: flex;
    align-items: center;
  }

  .account-configs .btn-account {
    position: relative;
    text-decoration: none;
    padding: 0.25rem 1rem;
  }

  .account-login {
    display: flex;
    align-items: center;
  }

  .btn-account {
    display: none;
    align-items: center;
    justify-content: center;
    font-family: Noto Sans, Arial, sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    min-height: 2rem;
    min-width: 2rem;
    border-radius: 1000px;
  }

  .btn-login {
    color: rgb(215, 218, 220);
    border: 1px solid rgb(215, 218, 220);
  }

  .btn-signup {
    color: rgb(26, 26, 27);
    background-color: rgb(215, 218, 220);
    margin-left: 0.25rem;
  }

  .btn-settings {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;
    width: 100%;
    padding: 2px 0;
    margin-left: 0.5rem;
  }

  .btn-settings img {
    width: 1.7rem;
    filter: invert(56%) sepia(7%) saturate(96%) hue-rotate(155deg)
      brightness(90%) contrast(87%);
  }

  .settings-wrapper {
    display: flex;
    align-items: center;
  }

  .btn-settings .down-arrow {
    font-size: 1.7rem;
    color: rgb(215, 218, 220);
    padding-bottom: 0.5rem;
  }

  .dropdown-menu {
    position: fixed;
    right: 0;
    width: max-content;
    background-color: ${({ theme }) => theme.colors.header};
    font-size: 14px;
    font-weight: 700;
    padding-top: 6px;
    padding-bottom: 10px;
    border: 1px solid #343536;
    border-top: none;
    border-radius: 0 0 4px 4px;
  }

  .dropdown-menu a,
  .dropdown-menu span {
    text-decoration: none;
    color: inherit;
    padding: 10px 16px 10px 48px;
    position: relative;
  }

  .options {
    display: flex;
    flex-direction: column;
  }

  .options span img {
    background: #818384;
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(237deg)
      brightness(103%) contrast(101%);
  }

  .dropdown-menu img {
    position: absolute;
    top: 10px;
    left: 16px;
    width: 20px;
    height: 20px;
    filter: invert(98%) sepia(10%) saturate(432%) hue-rotate(173deg)
      brightness(92%) contrast(86%);
  }

  @media (min-width: 615px) {
    .btn-account {
      display: flex;
    }
  }

  @media (min-width: 1070px) {
    .header-link > img:last-child {
      display: block;
    }
  }

  @media (min-width: 1180px) {
    a.btn-account {
      width: 120px;
    }

    .btn-settings {
      width: 70px;
    }
  }
`;
