import React from 'react';
import Board from '../components/Board'; 
import ListApp from '../components/ListApp'; 

export default function startGame() {
  return (<>
    <header>
      <h2>Desafio Front-end - Leonardo da Silva Marco</h2>
    </header>
    <main>
      <ListApp />
    </main>
  </>)
}