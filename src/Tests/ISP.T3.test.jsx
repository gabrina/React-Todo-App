import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp';

describe('T3 - very long title, non-empty list, filter All', () => {
  it('T3 - should add a very long task title without error', () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // پیش‌شرط: لیست غیرخالی
    fireEvent.change(input, { target: { value: 'Existing task' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Existing task')).toBeInTheDocument();

    // عنوان خیلی بلند
    const longTitle = 'x'.repeat(100);
    fireEvent.change(input, { target: { value: longTitle } });
    fireEvent.click(addButton);

    // انتظار: تسک با عنوان بلند اضافه شود
    expect(screen.getByText(longTitle)).toBeInTheDocument();
    // input خالی شود
    expect(input.value).toBe('');
  });
});
