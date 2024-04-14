'use client'

import { useState } from 'react';

interface SquareProps {
  value: string;
  onSquareClick: () => void;
}

export default function Square({value, onSquareClick}: SquareProps) {
  //  The null passed to useState is used as the initial value for this state variable,
  //  In typescript in case of multiples types i need to specify the types with <type | type>
  // const [squares, setSquares] = useState(Array(9).fill(null));

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}