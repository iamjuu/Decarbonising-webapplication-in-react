import React from "react";
import { Header } from "../../../assets"; // Ensure correct path and file type
import { Container, ContentWrapper } from "./style";

const data = [
  {
    id: 1,
    title: "We Are",
    subtitle: "Qualified & Professional",
    bg: Header,
  },
  // Add more objects here if needed
];

const Index = () => {
  return (
    <>
      {data.map((item) => (
        <Container key={item.id} bg={item.bg}>
          <ContentWrapper>
            <h1>
              {item.title} <br /> {item.subtitle.split(" & ").join(" &\n")}
            </h1>
          </ContentWrapper>
        </Container>
      ))}
    </>
  );
};

export default Index;
