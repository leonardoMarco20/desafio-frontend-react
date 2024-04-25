'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'; // Exemplo de ícone importado

interface BtnAppProps {
  disabled?: boolean;
  showPreviousIcon?: boolean;
  icon: IconDefinition;
  label?: React.ReactNode;
  showPrefixIcon?: boolean;
  className?: string;
  onClick?: () => void;
}

const BtnApp: React.FC<BtnAppProps> = ({ 
  disabled = false,
  showPreviousIcon = false,
  icon = faCoffee,
  label,
  showPrefixIcon,
  className = '',
  onClick,
  ...props  
}) => {
  return (
    <button {...props} className={`btn-app ${className} ${disabled ? 'disabled' : ''}`} onClick={onClick}>
      {showPreviousIcon && <FontAwesomeIcon icon={icon} />}
      {label}
      {showPrefixIcon && <FontAwesomeIcon icon={icon} />}
    </button>
  );
}

export default BtnApp