import React from 'react';

const StateCard = ({ state }) => {
  return (
    <div className="state-card">
      <h2>{state.name}</h2>
      <p>Capital: {state.capital}</p>
      <p>Population: {state.population}</p>
      <p>Nickname: {state.nickname}</p>
    </div>
  );
};

export default StateCard;
