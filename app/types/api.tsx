import axios from 'axios';
import { Character } from '../types/DataType'

const API = axios.create({
  // baseURL: `https://rickandmortyapi.com/api/character/?page=${currentPage}&status=${status}&name=${name}`,
  baseURL: `https://rickandmortyapi.com/api/character`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchCharacters = async (page: number = 1, status?: string, name?: string): Promise<Character[]> => {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(status ? { status } : {}),
    ...(name ? { name } : {}) 
  });

  const response = await API.get(`/?${params.toString()}`)
  return response.data.results;
};

export default API;