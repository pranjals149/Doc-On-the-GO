import styled from "styled-components";
import ImgSlider from "../ImgSlider/ImgSlider";
import Leftside from "../Leftside/Leftside";
import Main from "../Main/Main";
import Rightside from "../Rightside/Rightside";

const Home = (props) => {

  return (

    <Container>
      <ImgSlider />
      <Layout>

        <Leftside />
        <Main />
        <Rightside />

      </Layout>
    </Container>
  );
};

const Container = styled.div`
  max-width: 100%;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

export default Home;
