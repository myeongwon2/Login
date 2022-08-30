import styled from "styled-components";
import ProfileForm from "./ProfileForm";

const UserProfile = () => {
  return (
    <Profile>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </Profile>
  );
};

const Profile = styled.section`
  margin: 3rem auto;
  text-align: center;
  & h1 {
    font-size: 5rem;
  }
`;

export default UserProfile;
