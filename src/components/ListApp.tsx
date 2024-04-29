'use client'

import React,{ useState, useEffect } from 'react';
import { fetchCharacters } from '../types/api';

import CharacterCardApp from './CharacterCardApp';
import SearchApp from './SearchApp';
import PaginationApp from './PaginationApp';
import LoadingApp from './LoadingApp';

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store';
import { setCharactersList } from '../store/charactersSlice';

export default function ListApp() {
  const dispatch = useDispatch()
  const { charactersList } = useSelector((state: RootState) => state.charactersSlice);
  const currentPage = useSelector((state: RootState) => state.paginationSlice.currentPage);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const {results} = await fetchCharacters(currentPage);
        dispatch(setCharactersList(results));
        console.log(charactersList)
        setIsLoading(false);
      } catch (err) {
        console.error('Erro ao carregar os dados:', err);
        setError('Falha ao buscar dados');
        setIsLoading(false);
      }
    }
    loadData();
  }, [currentPage]);

  return (
    <>
      <div className="list-app" >
        {/* <SearchApp data-cy="search" className="list-app__search-app" placeholder="Pesquisar por nome..." /> */}
        
        {charactersList.length && <PaginationApp totalPages={0} />}
        
        { charactersList.length 
          ? <div className="card-list">
              {charactersList.map((character, index) => (
                <CharacterCardApp key={index} character={character} />
              ))}
            </div>
          : <div data-cy="empty-list" className="list-app__empty-message">Nenhum resultado encontrado</div>
        }

        {/* <LoadingApp data-cy="loading" v-show="isLoading" label="Loading..."/> */}
      </div>
    </>
  );
}