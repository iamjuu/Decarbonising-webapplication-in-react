import React from 'react'
import {AnimatedTestimonialsDemo} from '../../../components/animations/cards'
import styled from 'styled-components'
import {Caroseal1,Caroseal2,caroseal3} from '../../../assets'
const Image =[{
  id:1,
  img:Caroseal1
},{
  id:2,
  img:Caroseal2
},{
  id:3,
  img:caroseal3
}
]
const index = () => {
  return (
    <Container>
      <ContainerWrap>
<AnimatedTestimonialsDemo Image={Image}  />
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