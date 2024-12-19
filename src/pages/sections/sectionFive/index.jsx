import React, { useState } from 'react';
import {Button,Container,InputField,InputWrapper,Label,SvgIcon,Text,Wrapper,InputContainer} from './style'
import {useNavigate} from 'react-router-dom'

const Index = () => {
  const Navigate = useNavigate()
  const [vehicleNumber, setVehicleNumber] = useState('');

  const handleInputChange = (event) => {
    setVehicleNumber(event.target.value);
  };

  const handleSearch = () => {

    console.log('Searching for vehicle number:', vehicleNumber);
    Navigate('/vehicle-datails')
    
  };

  return (
    <Container>
      <Text>
      <p>If your vehicle is registered on this site, you can search for it here. If found, you can view your vehicle bill. Otherwise, you can register your slot.</p>
      </Text>
      <Wrapper>
        <Label>Search by vehicle number</Label>
        <InputWrapper>
          <InputContainer >
            <InputField
              type="text"
              placeholder="Search by vehicle Number"
              value={vehicleNumber}
              onChange={handleInputChange}
            />
            <Button type="button" onClick={handleSearch}>
              <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
              </SvgIcon>
            </Button>
          </InputContainer>
        </InputWrapper>
      </Wrapper>
    </Container>
  );
};

export default Index;
