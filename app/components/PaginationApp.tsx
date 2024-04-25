// PaginationApp.tsx

import React, { useState } from 'react';
import BtnApp from './BtnApp';
import { faAnglesLeft, faChevronLeft, faChevronRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

interface PaginationAppProps {
  totalPages: number;
}

const PaginationApp: React.FC<PaginationAppProps> = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToNextPagination = () => {
    const nextPage = currentPage + 5;
    setCurrentPage(Math.min(nextPage, totalPages));
  };

  const goToPreviousPagination = () => {
    const prevPage = currentPage - 5;
    setCurrentPage(Math.max(prevPage, 1));
  };

  const items = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-app">
      <BtnApp 
        className="pagination-app__button" 
        icon={faAnglesLeft} 
        onClick={goToFirstPage} 
        disabled={currentPage === 1} 
      />
      <BtnApp 
        className="pagination-app__button" 
        icon={faChevronLeft} 
        onClick={goToPreviousPagination} 
        disabled={currentPage <= 5} 
      />
      
      {items.map((item) => (
        <div key={item} className="pagination-app__button">
          <span onClick={() => goToPage(item)} className="pagination-app__text">{item}</span>
        </div>
      ))}

      <BtnApp 
        className="pagination-app__button" 
        icon={faChevronRight} 
        onClick={goToNextPagination} 
        disabled={currentPage > totalPages - 5} 
      />
      <BtnApp 
        className="pagination-app__button" 
        icon={faAnglesRight} 
        onClick={goToLastPage} 
        disabled={currentPage >= totalPages} 
      />
    </div>
  );
}

export default PaginationApp;
