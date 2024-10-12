import React from 'react';
import { useParams } from 'react-router-dom';
import useStateAPI from '../hooks/useStateApi';

const StateDetail = () => {
  const { id } = useParams();
  const { states, loading, error } = useStateAPI();
  const state = states.find(s => s.id === id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading state.</p>;

  return (
    <div>
      <h1>{state.name}</h1>
      <p>Capital: {state.capital}</p>
      <p>Population: {state.population}</p>
      <p>Nickname: {state.nickname}</p>
      <p>Fun Facts: {state.funFacts}</p>
    </div>
  );
};

export default StateDetail;
