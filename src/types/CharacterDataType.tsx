export interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
  species: string;
  firstSeenIn: string;
  episode: string
  // Adicione outras propriedades conforme necessário
}

export interface CharacterApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}