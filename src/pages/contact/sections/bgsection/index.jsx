
import { Container, ContainerWrap, BgContainer } from "../../styles";
import { Service2 } from "../../../../assets";
import { Main } from "./style";

const index = () => {
  const text = "Being a full-time psychologist, I help solving issues to heal mental problems for people.";
  
  return (
    <>
      <Container>
        <BgContainer bg={Service2}>
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
