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
];

const AnimatedText = ({ title, subtitle }) => {
  const renderText = (text) =>
    text.split(" ").map((word, index) => (
      <span key={index}>{word} </span>
    ));

  return (
    <ContentWrapper>
      <h1>
        {renderText(title)}
        <br /> 
        {renderText(subtitle.split(" & ").join(" &\n"))}
      </h1>
     
    </ContentWrapper>
  );
};

const Index = () => {
  return (
    <>
      {data.map((item) => (
        <Container key={item.id} bg={item.bg}>
          <AnimatedText title={item.title} subtitle={item.subtitle} />

        </Container>
      ))}
    </>
  );
};

export default Index;
