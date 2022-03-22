import React from 'react';
import { screen, render } from '@testing-library/react';
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

describe('Requisito 1 teste o componente App', () => {
  it('testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const nav = screen.getByRole('navigation');
    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavPokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(nav).toBeInTheDocument();
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavPokemons).toBeInTheDocument();
  });

  it('testa se a aplicação é redirecionada a página inicial, ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('testa se a aplicação é redirecionada a página Sobre ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('testa se a aplicação é redirecionada a página PV ao clicar em FP', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavPokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavPokemons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('testa se é redirecionado a página NotFound se o endereço e desconhecido ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/issononecziste');

    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
  });
});
