import React from 'react'
import {AnimatedTestimonialsDemo} from '../../../components/animations/cards'
import styled from 'styled-components'
const index = () => {
  return (
    <Container>
      <ContainerWrap>
<AnimatedTestimonialsDemo/>
      </ContainerWrap>
    </Container>
  )
}

export default index

const Container = styled.div`
  width: 100%;
  z-index: -10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`
const ContainerWrap = styled.div`
width: 100%;
max-width: 1300px;
display: flex;
justify-content: center;
align-items: center;
@media (max-width:768px) {
  width: 100%;
}
`