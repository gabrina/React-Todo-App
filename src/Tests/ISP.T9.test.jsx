import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp';

describe('T9 (MBCC B1) - empty title, empty list, filter Active', () => {
  it('T9 - should show alert and keep list empty when title is empty under Active filter', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // pre: list empty, filter Active
    const activeFilterButton = screen.getByRole('button', { name: /active/i });
    fireEvent.click(activeFilterButton);
    expect(screen.queryByText(/no tasks yet/i)).toBeInTheDocument();

    // act: try to add empty task (spaces)
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);

    // assert: alert shown, no task added
    expect(alertSpy).toHaveBeenCalledWith("Task can't be empty");
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();

    alertSpy.mockRestore();
  });
});
