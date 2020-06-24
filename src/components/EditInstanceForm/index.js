import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const StyledForm = styled.form.attrs({
  // className: 'bg-white rounded py-8 px-5 shadow' // max-w-sm mx-auto
  className: 'flex justify-between w-full'
})`
  & {
    input {
      ${tw`border-gray-300 w-full border-solid border rounded py-2 px-4 text-gray-800`}
    }
  }
`;

function EditInstanceForm({
  id,
  label,
  value,
  onChange,
  onSave,
  onCancel,
  disabled
}) {
  return (
    <StyledForm>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <div className="flex items-center w-16">
        <button
          className="text-xl ml-4 mr-4"
          type="button"
          onClick={onSave}
          disabled={disabled}
        >
          &#10003;
        </button>
        <button
          className="text-xl"
          type="button"
          onClick={onCancel}
          disabled={disabled}
        >
          &#10005;
        </button>
      </div>
    </StyledForm>
  );
}

export default EditInstanceForm;
