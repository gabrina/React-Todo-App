import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp';

describe('T0 (Base) - normal add when list non-empty & filter All', () => {
  it('T0 - should add a normal task to non-empty list under All filter', () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // clear list
    fireEvent.change(input, { target: { value: 'Existing task' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Existing task')).toBeInTheDocument();

    // normal title
    fireEvent.change(input, { target: { value: 'Sample Task' } });
    fireEvent.click(addButton);

    // expected: new task is added and showm
    expect(screen.getByText('Sample Task')).toBeInTheDocument();
    // input is cleared
    expect(input.value).toBe('');
  });
});


