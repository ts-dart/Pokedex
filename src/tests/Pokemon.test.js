import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import pokemons from '../data';

function renderWithRouter(component) {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>),
    history,
  });
}

describe('Requisito 6, teste o componente Pokemon', () => {
  it('testa se é renderizado um card com informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const btnMoreInfo = screen.getByRole('link', { name: 'More details' });
    userEvent.click(btnMoreInfo);

    const objName = screen.getByTestId('pokemon-name');
    const arr = Object.values(objName);
    const { children: name } = arr[arr.length - 1];

    const objType = screen.getByTestId('pokemon-type');
    const arr2 = Object.values(objType);
    const { children: type } = arr2[arr2.length - 1];

    const objWeight = screen.getByTestId('pokemon-weight');
    const arr3 = Object.values(objWeight);
    const { children: arrWeight } = arr3[arr3.length - 1];
    const weight = `${arrWeight[0]}${arrWeight[1]} ${arrWeight[3]}`;

    const imgPokemon = screen.getAllByRole('img');
    const arr4 = Object.values(imgPokemon[0]);
    const { src, alt } = arr4[arr4.length - 1];

    expect(imgPokemon[0]).toBeInTheDocument();
    expect(objWeight).toBeInTheDocument();
    expect(objName).toBeInTheDocument();
    expect(objType).toBeInTheDocument();
    expect(alt).toBe('Pikachu sprite');
    expect(src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(weight).toBe('Average weight: 6.0 kg');
    expect(name).toBe('Pikachu');
    expect(type).toBe('Electric');
  });

  it('Teste se o card tem um link de navegação para exibir infos deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const btnMoreInfo = screen.getByRole('link', { name: 'More details' });
    const arr = Object.values(btnMoreInfo);
    const { href } = arr[arr.length - 1];

    expect(btnMoreInfo).toBeInTheDocument();
    userEvent.click(btnMoreInfo);

    const { pathname } = history.location;

    expect(href).toBe('/pokemons/25');
    expect(pathname).toBe('/pokemons/25');
  });

  it('testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const btnMoreInfo = screen.getByRole('link', { name: 'More details' });
    userEvent.click(btnMoreInfo);

    const input = screen.getByRole('checkbox');
    userEvent.click(input);

    const imgs = screen.getAllByRole('img');
    const arr = Object.values(imgs[1]);
    const { src, alt } = arr[arr.length - 1];

    expect(src).toBe('/star-icon.svg');
    expect(alt).toBe('Pikachu is marked as favorite');
    expect(imgs[1]).toBeInTheDocument();
  });
});
