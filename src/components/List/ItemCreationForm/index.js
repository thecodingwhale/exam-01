import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { withNoStack, EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import StyledForm from '../../../styles/index';
import { CREATE_ITEM_FOR_LIST_ACTION_ID } from '../../../config';

// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
`;

function ItemCreationForm({ userId, createItem, refetchQueries }) {
  const [itemValue, updateItemValue] = useState('');
  const [loading, updateLoading] = useState(false);

  function handleChange(e) {
    updateItemValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!itemValue) {
      return;
    }

    updateLoading(true);

    const createItemResponse = await createItem({
      variables: {
        actionId: CREATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: userId,
          value: itemValue
        }),
        unrestricted: false
      },
      refetchQueries
    });

    const newItemData = JSON.parse(createItemResponse.data.Execute);

    updateItemValue('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <StyledForm>
      <input
        id="item-value"
        type="text"
        placeholder="Add Item"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={itemValue}
        disabled={loading}
      />
      <button type="submit" disabled={loading} onClick={handleSubmit}>
        {loading ? 'Creating Item...' : 'Create Item'}
      </button>
    </StyledForm>
  );
}

export default compose(graphql(EXECUTE, { name: 'createItem' }))(
  ItemCreationForm
);
