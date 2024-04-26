'use client'

import PropTypes from 'prop-types';
import React from 'react';

interface CardAppProps {
  useHeader?: boolean; // '?' indica que a prop é opcional
  header?: React.ReactNode; // React.ReactNode abrange tudo que pode ser renderizado
  content: React.ReactNode; // 'content' é obrigatório
  useActions?: boolean;
  actions?: React.ReactNode;
  className?: string
}

const CardApp: React.FC<CardAppProps> = ({ 
  useHeader = false,
  header,
  content,
  useActions = false,
  className = '',
  actions 
}) => {
  return (
    <>
      <div className={`card-app ${className}`}>
      { useHeader && header && (
        <div className="card-app__header">
          <div>{header}</div>
        </div>
      )}
      <div>{content}</div>
      { useActions && actions && (
        <div className="card-app__actions">
          <div>{actions}</div>
        </div>
      )}
      </div>
    </>
  );
}

CardApp.propTypes = {
  useHeader: PropTypes.bool,
  header: PropTypes.node,
  content: PropTypes.node.isRequired,
  useActions: PropTypes.bool,
  actions: PropTypes.node
};

export default CardApp;