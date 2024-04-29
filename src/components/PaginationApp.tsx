'use client'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as pagination from '../store/paginationSlice'
import { RootState } from '../store/store';

import { fetchCharacters } from '../types/api';
import BtnApp from './BtnApp';
import { faAnglesLeft, faChevronLeft, faChevronRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

interface PaginationAppProps {
  totalPages: number;
}

const PaginationApp: React.FC<PaginationAppProps> = () => {
  const dispatch = useDispatch()
  const {totalPages, currentPage} = useSelector((state: RootState) => state.paginationSlice);
  const paginationItems = useSelector(pagination.paginationItemsSelector);

  return (
    <div className="pagination-app">
      <div>{ currentPage }</div>
      <BtnApp
        className="pagination-app__button"
        icon={faAnglesLeft}

        onClick={() => dispatch(pagination.goToFirstPage())}
        disabled={currentPage === 1} 
      />
      <BtnApp
        className="pagination-app__button"
        icon={faChevronLeft}
        onClick={() => dispatch(pagination.goToPreviousPagination())}
        disabled={currentPage <= 5}
      />

      {paginationItems.map((item) => (
        <div onClick={() => dispatch(pagination.goToPage(item))} key={item} className="pagination-app__button">
          <span className="pagination-app__text">{item}</span>
        </div>
      ))}

      <BtnApp 
        className="pagination-app__button" 
        icon={faChevronRight} 
        onClick={() => dispatch(pagination.goToNextPagination())} 
        disabled={currentPage > totalPages - 5} 
      />
      <BtnApp 
        className="pagination-app__button" 
        icon={faAnglesRight} 
        onClick={() => dispatch(pagination.goToLastPage())} 
        disabled={currentPage >= totalPages} 
      />
    </div>
  );
}

export default PaginationApp;
