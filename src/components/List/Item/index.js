import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';
import {
  UPDATE_ITEM_FOR_LIST_ACTION_ID,
  DELETE_ITEM_FOR_LIST_ACTION_ID
} from '../../../config';
import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';

const List = styled.div`
  ${tw`hover:opacity-75 flex items-center h-16 cursor-pointer bg-white shadow-md px-4 py-4 text-gray-600 mb-4`}
`;

function Item({
  item,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect
}) {
  const [itemValue, updateItemValue] = useState(item.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);

  if (!selected) {
    return <List onClick={() => onSelect(item.id)}>{itemValue}</List>;
  }

  function handleItemValueChange(e) {
    updateItemValue(e.target.value);
  }

  async function handleItemValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          value: itemValue,
          instanceId: item.id
        })
      },
      refetchQueries
    });

    updateIsEditMode(false);
    updateIsSaving(false);
  }

  function handleCancelEdit() {
    updateIsEditMode(false);
  }

  if (isEditMode) {
    return (
      <List>
        <EditInstanceForm
          id={item.id}
          label="Item Value:"
          value={itemValue}
          onChange={handleItemValueChange}
          onSave={handleItemValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </List>
    );
  }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_ITEM_FOR_LIST_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: item.id
          })
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
      <List
        className="flex justify-between"
        selected={selected}
        isDeleting={isDeleting}
      >
        {itemValue}
        <DeleteInstanceMenu
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          disabled={isDeleting}
        />
      </List>
    );
  }

  return (
    <List selected={selected} className="flex justify-between">
      {itemValue}
      <div>
        <button
          className="text-xl mr-4"
          type="button"
          onClick={() => updateIsEditMode(true)}
        >
          &#9998;
        </button>
        <button
          className="text-xl"
          type="button"
          onClick={() => updateIsDeleteMode(true)}
        >
          &#128465;
        </button>
      </div>
    </List>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)(Item);
