import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../store/authContext";

// import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <Header>
      <Link to="/">
        <Logo>React Auth</Logo>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </Header>
  );
};

const Header = styled.div`
  width: 100%;
  height: 5rem;
  background-color: #38015c;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: baseline;
  }
  & li {
    margin: 0 1rem;
  }
  & a {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
  & button {
    font: inherit;
    background-color: transparent;
    border: 1px solid white;
    color: white;
    font-weight: bold;
    padding: 0.5rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
  }
  & a:hover {
    color: #c291e2;
  }

  & button:hover {
    background-color: #c291e2;
    color: #38015c;
  }
`;

const Logo = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 2rem;
  color: white;
  margin: 0;
`;

export default MainNavigation;
