import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders field and bench players', () => {
  render(<App />);
  const fieldPlayers = screen.getByText('Field');
  const benchPlayers = screen.getByText('Bench');
  expect(fieldPlayers).toBeInTheDocument();
  expect(benchPlayers).toBeInTheDocument();
});

test('moves player from field to bench on click', () => {
  render(<App />);
  const player = screen.getByText('Player 1');
  fireEvent.click(player);
  const fieldContainer = screen.getByText('Field').parentElement;
  const benchContainer = screen.getByText('Bench').parentElement;
  const fieldPlayers = fieldContainer?.querySelectorAll('p');
  const benchPlayers = benchContainer?.querySelectorAll('p');
  expect(Array.from(fieldPlayers || []).map(p => p.textContent)).not.toContain('Player 1');
  expect(Array.from(benchPlayers || []).map(p => p.textContent)).toContain('Player 1');
});

test('has the correct number of players on the field', () => {
  render(<App />);
  const fieldContainer = screen.getByText('Field').parentElement;
  const fieldPlayers = fieldContainer?.querySelectorAll('p');
  expect(fieldPlayers).toHaveLength(4); // FIELD_PLAYERS_COUNT
});