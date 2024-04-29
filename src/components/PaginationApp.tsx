'use client'
import React, { useEffect } from 'react';
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

  useEffect(() => {
    async function loadData() {
      try {
        const { info } = await fetchCharacters()
        dispatch(pagination.setTotalPages(info.pages)) 
      } catch (err) {
        console.error('Erro ao carregar os dados:', err);
      }
    }
    loadData();
  });
  return (
    <div className="pagination-app">
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
