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
    renderWithRouter(<Pokedex isPokemonFavoriteById={ {} } pokemons={ pokemons } />);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(h2).toBeInTheDocument();
  });

  it('testa se é exibido próximo Pokémon ao ser clicado o botão Próximo pokémon', () => {
    renderWithRouter(<Pokedex isPokemonFavoriteById={ {} } pokemons={ pokemons } />);

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
    renderWithRouter(<Pokedex isPokemonFavoriteById={ {} } pokemons={ pokemons } />);

    const img = screen.getAllByRole('img');
    expect(img).toHaveLength(1);
  });

  it('testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<Pokedex isPokemonFavoriteById={ {} } pokemons={ pokemons } />);

    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const btns = screen.getAllByRole('button');
    btns.pop();

    const types = btns.map((obj) => {
      expect(obj).toBeInTheDocument();
      const arr = Object.values(obj);
      const { children: type } = arr[arr.length - 1];
      return type;
    });

    const btnsByTest = screen.getAllByTestId('pokemon-type-button');
    btnsByTest.forEach((btn) => expect(btn).toBeInTheDocument());

    types.forEach((curr) => {
      const filtered = types.filter((type) => type === curr);
      expect(filtered).toHaveLength(1);
    });

    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    userEvent.click(btns[2]);
    const btnNextPokemon = screen.getByTestId('next-pokemon');

    for (let index = 0; index < 2; index += 1) {
      const objType = screen.getByTestId('pokemon-type');
      const arr = Object.values(objType);
      const { children: type } = arr[arr.length - 1];

      expect(type).toBe('Fire');
      userEvent.click(btnNextPokemon);
    }

    expect(btns[0]).toBeInTheDocument();
  });

  it('testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex isPokemonFavoriteById={ {} } pokemons={ pokemons } />);

    const btns = screen.getAllByRole('button');

    const arr = Object.values(btns[0]);
    const { children: nameButton } = arr[arr.length - 1];

    expect(btns[0]).toBeInTheDocument();
    expect(nameButton).toBe('All');

    userEvent.click(btns[0]);

    pokemons.forEach((curr) => {
      const eleName = screen.getByTestId('pokemon-name');
      const arrNameElement = Object.values(eleName);
      const { children: name } = arrNameElement[arrNameElement.length - 1];

      expect(name).toBe(curr.name);
      expect(eleName).toBeInTheDocument();
      userEvent.click(btns[btns.length - 1]);
    });
  });
});
