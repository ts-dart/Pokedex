import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Requisito 4, teste o component NotFound', () => {
  it('testa se página contém um h2 com o texto Page requested not found 😭', () => {
    render(<NotFound />);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });

    expect(h2).toBeInTheDocument();
  });

  it('testa se a pagina mostra uma determinda imagem', () => {
    render(<NotFound />);

    const img = screen.getAllByRole('img');
    const { src } = img[1];

    expect(img[1]).toBeInTheDocument();
    expect(src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
