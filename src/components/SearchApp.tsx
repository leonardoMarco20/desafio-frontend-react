'use client'

import React, { useState } from 'react';

import { Option } from '../types/SelectOptions'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store';

import BtnApp from './BtnApp';
import InputApp from './InputApp';
import SelectApp from './SelectApp';

import { setSearchName, updateStatus, clearFields } from '../store/searchSlice'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface SearchAppProps {
  placeholder: string;
  className?: string
}

const SearchApp: React.FC<SearchAppProps> = ({
  placeholder = '',
  className = ''
}) => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<Option>({ label: '', value: '' });
  const statusOptions = useSelector((state: RootState) => state.searchSlice.filter.statusOptions);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
    dispatch(setSearchName(newValue));
  };

  const handleSelectChange = (newValue) => {
    setSelectedStatus(newValue);
    dispatch(updateStatus(newValue));
  }

  const clearFilter = () => {
    setSelectedStatus({label: 'All', value: ''});
    setInputValue('');
    dispatch(clearFields());
  };
  
  return (
    <>
      <div className={`search-app ${className}`}>
        <InputApp onChange={handleInputChange} value={inputValue} icon={faMagnifyingGlass} placeholder={placeholder} />
        <SelectApp placeholder="Status" selectedOption={selectedStatus} onSelectOption={handleSelectChange} options={statusOptions} />
        <BtnApp onClick={clearFilter} label="Limpar" />
      </div>
    </>
  );
}

export default SearchApp;