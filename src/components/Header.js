import styled from "styled-components";
import logo from "../assets/logo.svg";
import reddit from "../assets/reddit.svg";
import search from "../assets/search.png";
import userIcon from "../assets/user-icon.svg";

function Header() {
  return (
    <StyledHeader>
      <div>
        <div className="header-left-container">
          <a href="/">
            <img src={logo} alt="Reddit logo" />
            <img src={reddit} alt="Reddit" />
          </a>
          <div className="search-container-outer">
            <div className="search-container-inner">
              <form>
                <label htmlFor="search-icon">
                  <div>
                    <img src={search} alt="search icon" />
                  </div>
                </label>
                <input
                  type="text"
                  id="search-icon"
                  placeholder="Search Reddit"
                />
              </form>
            </div>
          </div>
        </div>
        <div className="account-configs">
          <div className="account-configs-inner">
            <div className="account-login">
              <a href="/login" className="btn-login btn-account">
                Log In
              </a>
              <a href="/signup" className="btn-signup btn-account">
                Sign Up
              </a>
            </div>
            <div className="settings-drop-down">
              <div>
                <button className="btn-settings">
                  <span className="settings-wrapper">
                    <span>
                      <img src={userIcon} alt="User icon" />
                    </span>
                    <span className="down-arrow">&#8964;</span>
                  </span>
                </button>
              </div>
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
  flex: 0;
  /* background-color: ${({ theme }) => theme.colors.header}; */

  & > div {
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
    padding-top: 4px;
    padding-left: 1px;
    flex-grow: 1;
  }

  .search-container-outer {
    flex-grow: 1;
    margin: 0 auto;
    max-width: 690px;
  }

  .search-container-inner {
    fill: rgb(215, 218, 220);
    flex-grow: 1;
    width: auto;
    height: auto;
    margin: 0 1rem;
  }

  a {
    display: flex;
    align-items: center;
  }

  form {
    display: flex;
    height: 36px;
    background-color: rgb(39, 39, 41);
    border: 1px solid rgb(52, 53, 54);
    border-radius: 4px;
  }

  form:hover,
  form:focus-within {
    border: 1px solid rgb(215, 218, 220);
  }

  input {
    width: 100%;
    color: rgb(215, 218, 220);
    font-size: 16px;
    background-color: rgb(39, 39, 41);
    padding: 0;
    border: none;
    margin-right: 1rem;
    outline: none;
    line-height: 16px;
  }

  label {
    display: flex;
  }

  & label > div {
    display: flex;
    align-items: center;
    padding: 0 9px 0 15px;
  }

  label img {
    width: 24px;
    height: 24px;
  }

  a > img:first-child {
    width: 2.78rem;
    height: 3.21rem;
    padding: 8px 0.5rem 0.5rem 1px;
    vertical-align: baseline;
  }

  a > img:last-child {
    display: none;
    width: 63px;
    margin-right: 20px;
    padding: 0;
  }

  .account-configs-inner {
    display: flex;
    align-items: center;
  }

  .account-configs a {
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

  .account-configs a::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1000px;
    opacity: 0;
  }

  .btn-settings {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;
    width: 100%;
    background: transparent;
    padding: 2px 0;
    border: none;
    margin-left: 0.5rem;
    cursor: pointer;
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

  @media (min-width: 615px) {
    .btn-account {
      display: flex;
    }
  }

  @media (min-width: 1070px) {
    a > img:last-child {
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
