import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch paginated Pokémon list
  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      const res = await fetch(`${API_URL}?limit=20&offset=${offset}`);
      const data = await res.json();
      setPokemonList(data.results);
      setLoading(false);
    };
    fetchPokemons();
  }, [offset]);

  // Fetch details of a Pokémon
  const fetchDetails = async (name) => {
    const res = await fetch(`${API_URL}/${name}`);
    const data = await res.json();
    setSelectedPokemon(data);
  };

  return (
    <div className="app">
      <h1>Pokémon Browser</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-list">
          {pokemonList.map((p) => (
            <div key={p.name} className="pokemon-item">
              <span className="pokemon-name">{p.name}</span>
              <button onClick={() => fetchDetails(p.name)}>View Details</button>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          disabled={offset === 0}
          onClick={() => setOffset(offset - 20)}
        >
          Prev
        </button>
        <button onClick={() => setOffset(offset + 20)}>Next</button>
      </div>

      {selectedPokemon && (
        <div className="pokemon-details">
          <h2>{selectedPokemon.name}</h2>
          <p><strong>ID:</strong> {selectedPokemon.id}</p>
          <p><strong>Weight:</strong> {selectedPokemon.weight}</p>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <button onClick={() => setSelectedPokemon(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
