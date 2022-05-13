import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import WordCanvasHeader from '../WordCanvasHeader';

describe('Word Canvas Header', () => {
  const title = 'testTitle';
  const children = 'testChildren';
  const className = 'testClassName';

  it('header with title only', () => {
    render(<WordCanvasHeader title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('header with title and children', () => {
    render(<WordCanvasHeader title={title}>{children}</WordCanvasHeader>);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('header with title and children', () => {
    render(<WordCanvasHeader title={title}>{children}</WordCanvasHeader>);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('matches snapshot with no className prop', () => {
    const tree = renderer
      .create(<WordCanvasHeader title={title}>{children}</WordCanvasHeader>)
      .toTree();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot with className prop', () => {
    const tree = renderer
      .create(
        <WordCanvasHeader title={title} className={className}>
          {children}
        </WordCanvasHeader>,
      )
      .toTree();
    expect(tree).toMatchSnapshot();
  });
});
