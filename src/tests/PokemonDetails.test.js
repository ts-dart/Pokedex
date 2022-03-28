import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const MORE_DETAILS = 'More details';

function renderWithRouter(component) {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>),
    history,
  });
}

describe('Requisito 7, teste o componente PokemonDetails', () => {
  it('testa se as informações do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const btnMoreInfo = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(btnMoreInfo);

    const nameDetailsObj = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });

    const arr = Object.values(nameDetailsObj);
    const { children: nameDetails } = arr[arr.length - 1];

    const summaryTxtObj = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });

    const arr2 = Object.values(summaryTxtObj);
    const { children: summaryText } = arr2[arr2.length - 1];

    const parObj = screen.getByText(/This intelligent Pokémon roasts/i);
    const arr3 = Object.values(parObj);
    const { children: paragraph } = arr3[arr3.length - 1];

    const txt = 'This intelligent Pokémon roasts hard berries with electricity';
    const txt2 = ' to make them tender enough to eat.';

    expect(paragraph).toBe(txt + txt2);
    expect(summaryText).toBe('Summary');
    expect(nameDetails).toBe('Pikachu Details');
    expect(nameDetailsObj).toBeInTheDocument();
    expect(summaryTxtObj).toBeInTheDocument();
    expect(parObj).toBeInTheDocument();
  });

  it('testa se existe um mapa contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const btnMoreInfo = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(btnMoreInfo);

    const nameLocationsObj = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    const imgs = screen.getAllByAltText('Pikachu location');

    const arr = Object.values(imgs[0]);
    const { src: srcImgOne } = arr[arr.length - 1];

    const arr2 = Object.values(imgs[1]);
    const { src: srcImgTwo } = arr2[arr2.length - 1];

    console.log(srcImgTwo);

    const locationNameOne = screen.getByText(/Kanto Viridian Forest/i);
    const locationNameTwo = screen.getByText(/Kanto Power Plant/i);

    expect(imgs[0]).toBeInTheDocument();
    expect(imgs[1]).toBeInTheDocument();
    expect(locationNameOne).toBeInTheDocument();
    expect(locationNameTwo).toBeInTheDocument();
    expect(nameLocationsObj).toBeInTheDocument();
    expect(srcImgOne).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(srcImgTwo).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('testa se o usuário pode favoritar um pokémon na página de detalhes.', () => {
    renderWithRouter(<App />);

    const btnMoreInfo = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(btnMoreInfo);

    const inputCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(inputCheckbox).toBeInTheDocument();
    console.log(inputCheckbox);
    userEvent.click(inputCheckbox);
    console.log(inputCheckbox);

    const linkFavPokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavPokemons);

    const imgs = screen.getAllByRole('img');
    expect(imgs).toHaveLength(2);
    expect(imgs[0]).toBeInTheDocument();
    expect(imgs[1]).toBeInTheDocument();
  });
});
