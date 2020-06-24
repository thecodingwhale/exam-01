import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  width: 250px;
  padding: 1em 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 10px 10px;
  box-shadow: 10px 10px 8px -1px rgba(0, 0, 0, 0.6);
`;

export const ErrorContainer = styled.p`
  ${tw`text-xs text-red-800 mb-2`}
`;

export const Row = styled.div`
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;

  input {
    display: block;
    margin: 0.5em auto;
    width: 80%;
  }
`;
