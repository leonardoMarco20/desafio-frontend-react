'use client'

import React, {useEffect, useState, useRef} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'; 

interface Option {
  label: string,
  value: string
}

interface SelectAppProps {
  onSelectOption: (option: Option)=>{};
  placeholder: string;
  placeholderClass?: string;
  options: Option[]
  selectedOption: Option;
  className?: string
}

const SelectApp: React.FC<SelectAppProps> = ({ 
  onSelectOption,
  placeholder = '',
  placeholderClass = '',
  options = [],
  selectedOption = {
    label: '',
    value: ''
  },
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function selectOption(option: Option) {
    setIsDropdownOpen(false);
    onSelectOption(option);
  }

  useEffect(() => {
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
  
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  

  return (
    <>
      <div ref={ref} className={`select-app select-app--closed ${className}`}>
        <div className="select-app__content" onClick={toggleDropdown}>
          <span className={`select-app__placeholder ${placeholderClass}`}>{ placeholder }</span>
          <span>{ selectedOption.label }</span>
          <div className="select-app__selected-option">
            {
              isDropdownOpen 
                ? <FontAwesomeIcon icon={faCaretUp} />
                : <FontAwesomeIcon icon={faCaretDown} />
            }
          </div>
        </div>
        { isDropdownOpen && 
          <ul className="select-app__options" >
            {options.map((option) => (
              <li key={option.value} onClick={()=>{selectOption(option)}} className="select-app__option">{ option.label }</li>
            ))}
          </ul>
        }
      </div>
    </>
  );
}

export default SelectApp;