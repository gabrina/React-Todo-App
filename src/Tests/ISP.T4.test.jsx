import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp';

describe('T4 - special characters/emoji in title, non-empty list, filter All', () => {
  it('T4 - should add a task with special characters or emoji', () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // پیش‌شرط: لیست غیرخالی
    fireEvent.change(input, { target: { value: 'Existing task' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Existing task')).toBeInTheDocument();

    const specialTitle = 'Task ☕️!!!';
    fireEvent.change(input, { target: { value: specialTitle } });
    fireEvent.click(addButton);

    // انتظار: تسک با کاراکتر خاص نمایش داده شود
    expect(screen.getByText(specialTitle)).toBeInTheDocument();
    expect(input.value).toBe('');
  });
});
