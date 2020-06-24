import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { withNoStack, EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_ORDER_FOR_LIST_ACTION_ID
 } from '../../../config';

// np__added_start unit: list, comp: Orders_Creation, loc: styling
// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #F5F5F5;
`;
// np__added_end unit: list, comp: Orders_Creation, loc: styling

const Button = styled.button`
  margin-left: 1em;
`;

function OrderCreationForm({ parentId, createOrder, refetchQueries }) {
  const [ orderValue, updateOrderValue ] = useState('');
  const [ loading, updateLoading ] = useState(false);

  function handleChange(e) {
    updateOrderValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!orderValue) {
      return;
    }

    updateLoading(true);

    const createOrderResponse = await createOrder({
      variables: {
        actionId: CREATE_ORDER_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: parentId,
          value: orderValue,
        }),
        unrestricted: false,
      },
      refetchQueries
    });

    const newOrderData = JSON.parse(createOrderResponse.data.Execute);

    


    updateOrderValue('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <Form>
      <label htmlFor="order-value">
        Order:
        <input
          id="order-value"
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={ orderValue }
          disabled={loading}
        />
      </label>
      <Button type="submit"  disabled={loading}  onClick={handleSubmit}>
        {
          loading
            ? 'Creating Order...'
            : 'Create Order'
        }
      </Button>
    </Form>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'createOrder' }),
  
)(OrderCreationForm);
