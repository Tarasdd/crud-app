import React from 'react';
import classes from './NewButton.module.scss';

interface NewButtonProps {
  onClick: () => void;
  label: string;
  icon: string;
}

const NewButton: React.FC<NewButtonProps> = ({ onClick, label, icon }) => {
  return (
    <button className={classes.newButton} onClick={onClick}>
      <img src={icon} alt="Plus Icon" /> <p>{label}</p>
    </button>
  );
};

export default NewButton;