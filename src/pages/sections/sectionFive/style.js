import styled from 'styled-components';

export  const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background: linear-gradient(-80deg, #abaaaa6e, #ffffff);
    justify-content: center;
    align-items: center;
    padding: 1rem;
`;

export  const Text = styled.div`
    width: 50%;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 100;

    @media (max-width: 768px) {
      width: 100%;
        font-size: 0.875rem;
    }
`;

export  const Wrapper = styled.div`
  width: 50%;
  padding: 10px;

  @media (max-width: 768px) {

 width: 100%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

export  const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: .9rem;
  color: #4b5563;
`;

export  const InputWrapper = styled.div`
  position: relative;
`;

export  const InputField = styled.input`
  width: 100%;
  text-transform: uppercase;
  background-color: transparent;
  padding: 0.5rem 0.75rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  font-size: 0.875rem;
  color: #374151;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  ::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #9ca3af;
    box-shadow: 0 0 0 2px rgba(156, 163, 175, 0.5);
  }

  &:hover {
    border-color: #d1d5db;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.75rem;
  }
`;

export  const Button = styled.button`
  padding:10px;
  border-radius: 10px;
  background-color: #1e293b;
  border: 1px solid transparent;
  color: white;
  transition: all 0.3s ease;
  display: flex;


  &:hover {
    background-color: #334155;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    background-color: #475569;
    box-shadow: none;
  }

  &:active {
    background-color: #475569;
    box-shadow: none;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }


`;

export  const SvgIcon = styled.svg`
  width: 1rem;
  height: 1rem;

  @media (max-width: 768px) {
    width: 0.875rem;
    height: 0.875rem;
  }
`;
export const InputContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
/* background-color: red; */
gap: 10px;
justify-content: space-between;
width: 70%;
@media (max-width:425px) {
  width: 100%;
}
`
