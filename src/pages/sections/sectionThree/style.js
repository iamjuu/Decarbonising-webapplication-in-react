import styled from 'styled-components';

export  const Container = styled.div`
display:flex;
flex-direction:column;
  font-family: 'Roboto', sans-serif;
  padding: 4rem;
 /* background-color: #F5F5F5;  */

`;

export  const TextSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
margin-bottom: 70px;

  h5 {
    font-size: 1rem;
    color:red;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

export  const ServicesContainer = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
gap:20px;

`;

export  const ServiceItem = styled.div`
width:300px;
display: flex;
flex-direction: column;
justify-content:center;
align-items: center;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 40px;
`;

export  const ServiceImage = styled.img`
  width: 150px;
  height: 150px;
  box-shadow: 0 14px 16px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  object-fit: contain;
  margin-bottom: 1.5rem;
`;

export  const ServiceTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

export  const ServiceDescription = styled.p`
  font-size: .8rem;
  line-height: 1.4rem;
  color: #666;
`;
