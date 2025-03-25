import axios from 'axios';
import { CharacterApiResponse } from './CharacterDataType'

const API = axios.create({
  baseURL: `https://rickandmortyapi.com/api/character/`,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
});

export const fetchCharacters = async (page: number = 1, status?: string, name?: string): Promise<CharacterApiResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(status ? { status } : {}),
    ...(name ? { name } : {}) 
  });

  const {data} = await API.get(`/?${params.toString()}`)
  return data as CharacterApiResponse
};

export default API;