import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [pokedex, setPokedex] = useState([]);
  const [wildPokemon, setWildPokemon] = useState({});
  //Putting [pokedex] -> runs useEffect whenever the pokedex is changed
  //Putting [] -> runs useEffect once
  //Putting nothing -> runs everytime, anytime a state is updated
  useEffect(() => {
    encounterWildPokemon();
  }, []);

  //Purpose: create a unique ID
  const pokeId = () => {
    const min = Math.ceil(1);
    const max = Math.floor(151);
    console.log(Math.floor(Math.random() * (max - min + 1)) + min);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  //Purpose: api call to grab our 151 pokemon and store in state
  const encounterWildPokemon = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + pokeId())
      .then(response => {
        console.log(response.data);
        setWildPokemon(response.data);
      });
  };

  //requires state as arg to preserve previous state
  const catchPokemon = (pokemon) => {
    setPokedex (state => {
      const monExists = (state.filter(p => pokemon.id == p.id).length > 0);
      if (!monExists){
        state = [...state, pokemon]
        state.sort(function(a,b){return a.id-b.id})
      }
      return state
    })
    encounterWildPokemon()
  }

  const releasePokemon = id => {
    setPokedex(state => state.filter(p => p.id != id))
  }
  return (
    <div className="App">
        <header>
          <h1 className="title">React Hooks</h1>
          <h3 className="subtitle">With Pokémon</h3>
        </header>

        <section className="wild-pokemon">
          <h2>Wild Encounter</h2>
          <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + wildPokemon.id + ".png"} className="sprite" />
          <h3>{wildPokemon.name}</h3>
          <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>CATCH</button>
        </section>

        <section className="pokedex">
          <h2>Pokédex</h2>
          <div className="pokedex-list">
            {pokedex.map(pokemon => (
              <div className="pokemon" key={pokemon.id}>
                <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} className="sprite" />
                <h3 className="pokemon-name">{pokemon.name}</h3>
                <button className="remove" onClick={() => releasePokemon(pokemon.id)}>&times;</button>
              </div>
            ))}
          </div>
        </section>
    </div>
  )
}

export default App;
