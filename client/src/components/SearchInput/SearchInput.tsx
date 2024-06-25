import React, { useState } from 'react';
import classes from './SearchInput.module.scss';
import searchIcon from '../../icons/search.svg';

interface SearchInputProps {
  onSearchChange: (searchTerm: string) => void;
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearchChange, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <div className={classes.searchWrapper}>
      <img src={searchIcon} alt="Search" className={classes.searchIcon} />
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className={classes.searchInput}
      />
    </div>
  );
};

export default SearchInput;