// About.js
import { Container, ContainerWrap, BgContainer } from "../../styles";
import {  Service3} from "../../../../assets";
import { Main } from "./style";

const index = () => {
  const text = "This i s website to service your vehicles ";
  
  return (
    <>
      <Container>
        <BgContainer bg={Service3}>
          <ContainerWrap>
            <Main>
              <h1>
                {text.split(" ").map((word, index) => (
                  <span key={index}>{word}</span>
                ))}
              </h1>
            </Main>
          </ContainerWrap>
        </BgContainer>
      </Container>
    </>
  );
};

export default index;
