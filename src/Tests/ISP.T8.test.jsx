import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp';

describe('T8 (MBCC Base B1) - normal title, empty list, filter Active', () => {
  it('T8 - should add first active task when list is empty and filter is Active', () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // pre: switch to Active filter, list is empty
    const activeFilterButton = screen.getByRole('button', { name: /active/i });
    fireEvent.click(activeFilterButton);
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();

    // act: add first task with normal title
    fireEvent.change(input, { target: { value: 'Buy milk' } });
    fireEvent.click(addButton);

    // assert: new task is visible under Active
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(input.value).toBe('');
  });
});
