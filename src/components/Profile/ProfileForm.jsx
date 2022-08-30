import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../store/authContext";

const ProfileForm = () => {
  const history = useHistory();
  const newpasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHnalder = (e) => {
    e.preventDefault();

    const enteredNewPassword = newpasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCCqivSaQa5R0de55EEnZUeoJ4PTU6S2xM",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      //항상 성공 가정
      history.replace("/");
    });
  };

  return (
    <Form onSubmit={submitHnalder}>
      <Control>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newpasswordInputRef}
        />
      </Control>
      <Action>
        <button>Change Password</button>
      </Action>
    </Form>
  );
};

const Form = styled.form`
  width: 95%;
  max-width: 25rem;
  margin: 2rem auto;
`;

const Control = styled.div`
  margin-bottom: 0.5rem;
  & label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #353336;
    display: block;
  }

  & input {
    display: block;
    font: inherit;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #38015c;
    padding: 0.25rem;
    background-color: #f7f0fa;
  }
`;

const Action = styled.div`
  margin-top: 1.5rem;
  & button {
    font: inherit;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    background-color: #38015c;
    color: white;
    border: 1px solid #38015c;
  }

  & button:hover {
    background-color: #540d83;
    border-color: #540d83;
  }
`;

export default ProfileForm;
