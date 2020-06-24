import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  color: #bbbbbb;
  transition: color 0.5s ease;
  &:hover {
    color: ${props => props.hoverColor || '#000000'};
  }
`;

const Container = styled.div`
  color: red;
  margin: 1em;
  padding: 1em;
  border: 1px solid #eeeeee;
`;

function DeleteInstanceMenu({ onDelete, onCancel, disabled }) {
  return (
    <div>
      Delete?
      <button
        className="text-xl ml-4 mr-4"
        type="button"
        onClick={onDelete}
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
  );
}

export default DeleteInstanceMenu;
