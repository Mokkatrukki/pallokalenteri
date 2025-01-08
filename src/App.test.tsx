import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders field and bench containers', () => {
  render(<App />);
  expect(screen.getByTestId('field-container')).toBeInTheDocument();
  expect(screen.getByTestId('bench-container')).toBeInTheDocument();
});

test('moves player from field to bench on click', () => {
  render(<App />);
  const player1 = screen.getByTestId('field-player-1');
  fireEvent.click(player1);
  
  expect(screen.queryByTestId('field-player-1')).not.toBeInTheDocument();
  expect(screen.getByTestId('bench-player-1')).toBeInTheDocument();
});

test('has the correct number of players on the field', () => {
  render(<App />);
  const fieldPlayers = screen.getAllByTestId(/^field-player-/);
  expect(fieldPlayers).toHaveLength(4); // FIELD_PLAYERS_COUNT
});

test('undo button reverts player movement', () => {
  render(<App />);
  
  const player1 = screen.getByTestId('field-player-1');
  const undoButton = screen.getByTestId('undo-button');
  
  expect(undoButton).toBeDisabled();
  
  fireEvent.click(player1);
  expect(undoButton).toBeEnabled();
  
  fireEvent.click(undoButton);
  expect(screen.getByTestId('field-player-1')).toBeInTheDocument();
  //expect(undoButton).toBeDisabled();
});