import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import projectStore from '../../stores/projectStore';
import classes from './NewProjectModal.module.scss';

const NewProjectModal: React.FC = () => {
  const [name, setName] = useState('');
  const [measurement, setMeasurement] = useState('Metric');
  const [error, setError] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value) && value.length <= 150) {
      setName(value);
      setError('');
    } else {
      setError('Name can only contain letters and numbers and must be 150 characters or less.');
    }
  };

  const handleCreate = () => {
    if (name === '') {
      setError('Name is required.');
    } else {
      projectStore.addProject(name, measurement);
      projectStore.toggleModal();
    }
  };

  return (
    <div className={classes.modalBackdrop}>
      <div className={classes.modalContent}>
        <div className={classes.modalHeader}>
          <h2>New Project</h2>
          <button className={classes.closeButton} onClick={() => projectStore.toggleModal()}>×</button>
        </div>
        <div className={classes.modalBody}>
          <div className={classes.formGroup}>
            <label htmlFor="projectName">Name</label>
            <input
              id="projectName"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="New project"
            />
            {error && <div className={classes.error}>{error}</div>}
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="measurement">Measurement system</label>
            <select
              id="measurement"
              value={measurement}
              onChange={(e) => setMeasurement(e.target.value)}
            >
              <option value="Metric">Metric</option>
              <option value="Imperial">Imperial</option>
            </select>
          </div>
        </div>
        <div className={classes.modalFooter}>
          <button onClick={handleCreate}>Create</button>
          <button onClick={() => projectStore.toggleModal()}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default observer(NewProjectModal);
