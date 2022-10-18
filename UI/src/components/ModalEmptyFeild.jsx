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

const ModalEmptyFeild = ({ handleEmptyFeild, phrase }) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });

  const { open, size } = state;
  // const emptyFeildPhrase = () => {
  //   <p>You forgt something, feilds cannot be empty.</p>;
  // };

  return (
    <>
      <Button
        className="tiny ui compact button"
        onClick={() => dispatch({ type: 'open', size: 'mini' })}
      >
        {/* <i className="trash icon" /> */}
        Add Item
      </Button>

      <Modal size={size} open={open} onClose={() => dispatch({ type: 'close' })}>
        <Modal.Header>Oops...</Modal.Header>
        <Modal.Content>
          {typeof phrase === 'function' ? (
            phrase()
          ) : (
            <p>You forgt something, feilds cannot be empty.</p>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'close' })}>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ModalEmptyFeild;
