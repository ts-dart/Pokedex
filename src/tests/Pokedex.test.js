import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

function renderWithRouter(component) {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>),
    history,
  });
}

describe('Requisito 5, testa o componente pokedex', () => {
  it('testa se a página contém um h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex isPokemonFavoriteById={ [] } pokemons={ pokemons } />);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(h2).toBeInTheDocument();
  });

  it('testa se é exibido próximo Pokémon ao ser clicado o botão Próximo pokémon', () => {
    renderWithRouter(<Pokedex isPokemonFavoriteById={ [] } pokemons={ pokemons } />);

    const LIMIT_LOOP = 9;
    const POKEMON_NAMES_BY_PAGE = [];

    const btnNextPokemon = screen.getByTestId('next-pokemon');
    const arrBtn = Object.values(btnNextPokemon);
    const { children: valueBtn } = arrBtn[arrBtn.length - 1];

    const pokemonNamesByData = pokemons.map((obj) => obj.name);
    pokemonNamesByData.push('Pikachu');

    for (let index = 0; index <= LIMIT_LOOP; index += 1) {
      const elementPar = screen.getByTestId('pokemon-name');
      const arr = Object.values(elementPar);
      const { children: nameCurrPokemon } = arr[arr.length - 1];
      POKEMON_NAMES_BY_PAGE.push(nameCurrPokemon);

      if (index === LIMIT_LOOP) {
        expect(nameCurrPokemon).toBe('Pikachu');
      }

      expect(elementPar).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
    }

    expect(valueBtn).toBe('Próximo pokémon');
    expect(POKEMON_NAMES_BY_PAGE).toEqual(pokemonNamesByData);
  });

  it('testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<Pokedex isPokemonFavoriteById={ [] } pokemons={ pokemons } />);

    const img = screen.getAllByRole('img');
    expect(img).toHaveLength(1);
  });

  it('testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<Pokedex isPokemonFavoriteById={ [] } pokemons={ pokemons } />);

    pokemons.forEach((obj) => {
      const btn = screen.getByText(obj.type);
      console.log(btn);
    });
  });
});
