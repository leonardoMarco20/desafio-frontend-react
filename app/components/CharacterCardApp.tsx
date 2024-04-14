'use client'

import axios from 'axios';
import CardApp from './CardApp';
import React, { useEffect, useState } from 'react';
import { Character } from '../types/DataType'

interface Location {
  name: string,
  url: string
}

interface CharacterCardApp {
  character: Character
}

const CharacterCardApp: React.FC<CharacterCardApp> = ({ character }) => {
  
  const [firstSeenIn, setFirstSeenIn] = useState<string>('Loading...'); // Estado inicial

  const getFirstSeenIn = async (episodeUrl: string) => {
    try {
      const { data } = await axios.get(episodeUrl); // Supondo que `episode` é uma URL
      setFirstSeenIn(data.name); // Atualiza o estado
    } catch (error) {
      console.error('Erro ao carregar dados do personagem:', error);
      setFirstSeenIn('Erro ao carregar dados');
    }
  }

  useEffect(() => {
    if (character.episode) {
      getFirstSeenIn(character.episode);
    }
  }, [character.episode]); // Dependência para re-executar quando o episódio mudar


  const statusIcon = `card-details__status-icon--${character.status.toLowerCase()}`;

  return (
    <>
      <CardApp content ={
        <div className="character-card-app__content">
          <div className="card-image">
            <img src={character.image} alt={character.name} />
          </div>
          <div className="card-details">
            <div className="card-details__header">
              <h2>{ character.name }</h2>
              <div className="card-details__status">
                <div className={`card-details__status-icon ${statusIcon}`} />
                <span data-cy="character-status">{character.status}</span>
                <span>-</span>
                <span>{ character.species }</span>
              </div>
            </div>
            <div className="card-details__content">
              <div className="card-details__content__section">
                <span className="card-details__subtitle">Last known location:</span>
                <span>{ character.location.name }</span>
              </div>
              <div className="card-details__content__section">
                <span className="card-details__subtitle">First seen in:</span>
                <span>{ firstSeenIn }</span>
              </div>
            </div>
          </div>
        </div>
      }></CardApp>
    </>
  );
}


export default CharacterCardApp