import styled from "styled-components";

const StartingPageContent = () => {
  return (
    <Starting>
      <h1>Welcome on Board!</h1>
    </Starting>
  );
};

const Starting = styled.section`
  margin: 3rem auto;
  text-align: center;
  & h1 {
    font-size: 5rem;
  }
`;

export default StartingPageContent;
