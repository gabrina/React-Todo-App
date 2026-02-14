import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from './TodoApp';

describe('T10 (MBCC B1) - special chars title, empty list, filter Active', () => {
  it('T10 - should add first active task with special characters under Active filter', () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // pre: list empty, filter Active
    const activeFilterButton = screen.getByRole('button', { name: /active/i });
    fireEvent.click(activeFilterButton);
    expect(screen.queryByText('Task ☕️!!!')).not.toBeInTheDocument();

    const specialTitle = 'Task ☕️!!!';

    // act: add first task with special characters
    fireEvent.change(input, { target: { value: specialTitle } });
    fireEvent.click(addButton);

    // assert: task is visible under Active with exact text
    expect(screen.getByText(specialTitle)).toBeInTheDocument();
    expect(input.value).toBe('');
  });
});
