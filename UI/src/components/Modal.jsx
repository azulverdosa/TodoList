import React, { useState } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false };
    case 'open':
      return { open: true, size: action.size };
    default:
      throw new Error('Unsupported action...');
  }
}

const ModalConfirmDelete = ({ handleDelete, phrase }) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });

  const { open, size } = state;

  return (
    <>
      <Button
        className="tiny ui compact button"
        onClick={() => dispatch({ type: 'open', size: 'mini' })}
      >
        <i className="trash icon" />
      </Button>

      <Modal size={size} open={open} onClose={() => dispatch({ type: 'close' })}>
        <Modal.Header>CONFIRM</Modal.Header>
        <Modal.Content>{typeof phrase === 'function' ? phrase() : <p>{phrase}</p>}</Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            No
          </Button>
          <Button positive onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ModalConfirmDelete;
