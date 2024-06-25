import React from 'react';
import classes from './DeleteConfirmationModal.module.scss';

interface DeleteConfirmationModalProps {
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onClose, onDelete }) => {
  return (
    <div className={classes.modalBackdrop}>
      <div className={classes.modalContent}>
        <div className={classes.modalHeader}>
          <h2>Delete</h2>
          <button className={classes.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={classes.modalBody}>
          <p>Are you sure you want to delete the selected projects?</p>
        </div>
        <div className={classes.modalFooter}>
          <button className={classes.deleteButton} onClick={onDelete}>Delete</button>
          <button className={classes.cancelButton} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
