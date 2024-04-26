'use client'

import React,{ useState, useEffect } from 'react';
import { fetchCharacters } from '../types/api';

import CharacterCardApp from './CharacterCardApp';
import SearchApp from './SearchApp';
import PaginationApp from './PaginationApp';
import LoadingApp from './LoadingApp';

import { Character } from '../types/CharacterDataType'

export default function ListApp() {
  const [charactersList, setCharactersList] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const {results} = await fetchCharacters();
        
        setCharactersList(results);
        setIsLoading(false);
      } catch (err) {
        console.error('Erro ao carregar os dados:', err);
        setError('Falha ao buscar dados');
        setIsLoading(false);
      }
    }
    loadData();
  }, []);


  return (
    <>
      <div className="list-app" >
        {/* <SearchApp data-cy="search" className="list-app__search-app" placeholder="Pesquisar por nome..." /> */}
        
        { charactersList.length 
          ? <div className="card-list">
              {charactersList.map((character, index) => (
                <CharacterCardApp key={index} character={character} />
              ))}
            </div>
          : <div data-cy="empty-list" className="list-app__empty-message">Nenhum resultado encontrado</div>
        }

        {charactersList.length && <PaginationApp totalPages={0} />}
        {/* <LoadingApp data-cy="loading" v-show="isLoading" label="Loading..."/> */}
      </div>
    </>
  );
}