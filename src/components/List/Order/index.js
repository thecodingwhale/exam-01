import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';

import {
  UPDATE_ORDER_FOR_LIST_ACTION_ID,
  DELETE_ORDER_FOR_LIST_ACTION_ID,
} from '../../../config';

import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';





// add styling here
const OrderStyleWrapper = styled.div(({
  selected,
  isDeleting,
}) => `
  margin: 2em 1em;
  padding: 1.5em;
  border: ${selected ? '1px solid aquamarine': '1px solid white'};
  border-radius: 10px;
  box-shadow: 5px 5px 10px #888888;
  background-color: ${isDeleting && 'tomato'};
  cursor: ${selected ? 'auto' : 'pointer'};

  &:hover {
    border: 1px solid aquamarine;
  }
`);

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

function Order({
  order,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
}) {
  const [orderValue, updateOrderValue] = useState(order.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);

  


  if (!selected) {
    return (
      <OrderStyleWrapper onClick={() => onSelect(order.id)}>
        { orderValue }
      </OrderStyleWrapper>
    );
  }

  function handleOrderValueChange(e) {
    updateOrderValue(e.target.value);
  }

  async function handleOrderValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_ORDER_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          value: orderValue,
          instanceId: order.id,
        }),
      },
      refetchQueries,
    });

    updateIsEditMode(false);
    updateIsSaving(false);
  }

  function handleCancelEdit() {
    updateIsEditMode(false);
  }

  if (isEditMode) {
    return (
      <OrderStyleWrapper>
        <EditInstanceForm
          id={ order.id }
          label="Order Value:"
          value={ orderValue }
          onChange={handleOrderValueChange}
          onSave={handleOrderValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </OrderStyleWrapper>
    );
  }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_ORDER_FOR_LIST_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: order.id,
          }),
        },
        refetchQueries
      });
    } catch (e) {
      updateIsDeleting(false);
    }
  }

  function handleCancelDelete() {
    updateIsDeleteMode(false);
  }

  if (isDeleteMode) {
    return (
      <OrderStyleWrapper
        selected={selected}
        isDeleting={isDeleting}
      >
        { orderValue }
        <DeleteInstanceMenu
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          disabled={isDeleting}
        />
      </OrderStyleWrapper>
    );
  }

  return (
    <OrderStyleWrapper selected={selected}>
      { orderValue }
      <Button
        type="button"
        onClick={() => updateIsEditMode(true)}
      >
        &#9998;
      </Button>
      <Button
        type="button"
        onClick={() => updateIsDeleteMode(true)}
      >
        &#128465;
      </Button>

      


    </OrderStyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)(Order);
