import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

function renderWithRouter(component) {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>),
    history,
  });
}

describe('Requisito 3, testa o component FavoritePokemons', () => {
  it('testa se a pessoa não tiver pokémons favoritos, mostra um texto', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(link);

    const { pathname } = history.location;

    const p = screen.getByText('No favorite pokemon found');

    expect(pathname).toBe('/favorites');
    expect(p).toBeInTheDocument();
  });

  it('testa se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);

    const { pathname: endPointPokemons } = history.location;

    const input = screen.getByRole('checkbox');
    userEvent.click(input);

    const linkFavPokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavPokemons);

    const { pathname: endPointFavPokemons } = history.location;

    const img = screen.getAllByRole('img');

    expect(endPointPokemons).toBe('/pokemons/25');
    expect(endPointFavPokemons).toBe('/favorites');
    expect(img[0]).toBeInTheDocument();
    expect(img[1]).toBeInTheDocument();
  });
});
