import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

const ModalDialog = (props) => (
  <Dialog
    title={props.title}
    // actions={actions}
    modal={props.modal}
    open={props.modalDialog && props.modalDialog.state}
    onRequestClose={props.handleClose}
  >
    {props.modalDialog && props.modalDialog.message}
  </Dialog>
);

ModalDialog.defaultProps = {
  modalDialog: null,
  title: '',
  modal: true
};

ModalDialog.propTypes = {
  modalDialog: PropTypes.object,
  title: PropTypes.string,
  modal: PropTypes.bool
};

export default ModalDialog;
