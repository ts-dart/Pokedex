import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 2, teste o comonent About', () => {
  it('testa se a página contém as informações sobre a Pokédex', () => {
    render(<About />);

    const txt1 = 'This application simulates a Pokédex,';
    const txt2 = ' a digital encyclopedia containing all Pokémons';

    const p = screen.getByText(txt1 + txt2);

    const p2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );

    expect(p).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('testa se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(h2).toBeInTheDocument();
  });

  it('testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);

    const txt1 = 'This application simulates a Pokédex,';
    const txt2 = ' a digital encyclopedia containing all Pokémons';

    const p = screen.getByText(txt1 + txt2);

    const p2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );

    const values = Object.values(p);
    const elements = [values[0].elementType];

    const values2 = Object.values(p2);
    elements.push(values2[0].elementType);

    expect(p).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
    expect(elements[0]).toBe('p');
    expect(elements[1]).toBe('p');
    expect(elements).toHaveLength(2);
  });

  it('testa se a página contém uma determinada imagem de uma Pokédex', () => {
    render(<About />);

    const img = screen.getByRole('img');
    const obj = Object.values(img);
    const { src } = obj[obj.length - 1];

    expect(img).toBeInTheDocument();
    expect(src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
