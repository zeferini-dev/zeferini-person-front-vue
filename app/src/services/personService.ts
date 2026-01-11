import { API_COMMAND_URL, API_QUERY_URL } from './api';
import type { CreatePerson, Person, UpdatePerson } from '../types/person';

async function request<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...init
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Erro ao comunicar com a API');
  }

  return response.json() as Promise<T>;
}

const commandResource = `${API_COMMAND_URL}/persons`;
const queryResource = `${API_QUERY_URL}/persons`;

export const personService = {
  list: () => request<Person[]>(queryResource),
  get: (id: string) => request<Person>(`${queryResource}/${id}`),
  create: (data: CreatePerson) => request<Person>(commandResource, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id: string, data: UpdatePerson) => request<Person>(`${commandResource}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),
  remove: (id: string) => request<Person>(`${commandResource}/${id}`, {
    method: 'DELETE'
  })
};
