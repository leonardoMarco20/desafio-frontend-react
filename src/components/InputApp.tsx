'use client'

import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

interface InputAppProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: IconDefinition;
  className?: string
}

const InputApp: React.FC<InputAppProps> = ({ 
  value,
  onChange,
  placeholder = '',
  icon,
  className = ''
}) => {
  // Toda vez que alterar o value, setInputValue vai alterar o value para o novo valor
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value); //altera o valor
  }, [value]); //observa a mudança

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const clear = () => {
    setInputValue('');
    onChange(''); 
  };
  
  return (
    <>
      <div className={`input-app ${className}`}>
        { icon && <FontAwesomeIcon icon={icon} /> }
        <div className="input-app__content">
          <input 
            type='text'
            value={inputValue} 
            onChange={handleInputChange} 
            placeholder={placeholder} 
          />
          { inputValue && <FontAwesomeIcon className="input-app__clear" icon={faCircleXmark} onClick={clear} /> }
        </div>
      </div>
    </>
  );
}

export default InputApp;