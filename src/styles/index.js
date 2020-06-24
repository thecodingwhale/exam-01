import styled from 'styled-components';
import tw from 'twin.macro';

const StyledForm = styled.form.attrs({
  className: 'bg-white rounded py-8 px-5 shadow' // max-w-sm mx-auto
})`
  & {
    h1 {
      ${tw`text-xl text-gray-800 mb-6`}
    }
    input {
      ${tw`border-gray-300 mb-2 w-full border-solid border rounded py-2 px-4 text-gray-800`}
    }
    button[type='submit'] {
      ${tw`bg-blue-500 hover:bg-blue-700 mb-2 text-white text-xs font-bold uppercase py-2 px-4 border rounded-full no-underline outline-none block`}
      width: 100%;
    }
    button[type='button'] {
      ${tw`hover:text-gray-500 text-gray-400 mb-2 text-xs font-bold uppercase py-2 px-4 border rounded-full no-underline outline-none block`}
      width: 100%;
    }
  }
`;

export default StyledForm;
