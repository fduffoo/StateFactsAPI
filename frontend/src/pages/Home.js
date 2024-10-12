import React from 'react';
import useStateApi from '../hooks/useStateApi';
import StateCard from '../components/StateCard';

const Home = () => {
  const { states, loading, error } = useStateAPI();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading states.</p>;

  return (
    <div>
      <h1>State Facts</h1>
      <div className="state-grid">
        {states.map((state) => (
          <StateCard key={state.id} state={state} />
        ))}
      </div>
    </div>
  );
};

export default Home;
