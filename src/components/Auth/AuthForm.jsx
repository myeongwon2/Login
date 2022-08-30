import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../store/authContext";

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredpassword = passwordInputRef.current.value;

    // optional : Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCqivSaQa5R0de55EEnZUeoJ4PTU6S2xM";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCqivSaQa5R0de55EEnZUeoJ4PTU6S2xM";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredpassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        history.replace("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Auth>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <Control>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </Control>
        <Control>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </Control>
        <Actions>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request....</p>}
          <button
            type="button"
            className="toggle"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </Actions>
      </form>
    </Auth>
  );
};

const Auth = styled.section`
  margin: 3rem auto;
  width: 95%;
  max-width: 25rem;
  border-radius: 6px;
  background-color: #38015c;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  text-align: center;
  color: white;
  & h1 {
    text-align: center;
    color: white;
  }
`;

const Control = styled.div`
  margin-bottom: 0.5rem;
  & label {
    display: block;
    color: white;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  & input {
    font: inherit;
    background-color: #f1e1fc;
    color: #38015c;
    border-radius: 4px;
    border: 1px solid white;
    width: 100%;
    text-align: left;
    padding: 0.25rem;
  }
`;

const Actions = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  & button {
    cursor: pointer;
    font: inherit;
    color: white;
    background-color: #9f5ccc;
    border: 1px solid #9f5ccc;
    border-radius: 4px;
    padding: 0.5rem 2.5rem;
  }

  & button:hover {
    background-color: #873abb;
    border-color: #873abb;
  }

  & .toggle {
    margin-top: 1rem;
    background-color: transparent;
    color: #9f5ccc;
    border: none;
    padding: 0.15rem 1.5rem;
  }

  & .toggle:hover {
    background-color: transparent;
    color: #ae82cc;
  }
`;

export default AuthForm;
