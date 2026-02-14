import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp';

describe('T6 - normal title, non-empty list, filter Active', () => {
  it('T6 - new active task should appear under Active filter', () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // پیش‌شرط: لیست غیرخالی
    fireEvent.change(input, { target: { value: 'Existing active task' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Existing active task')).toBeInTheDocument();

    // فیلتر را روی Active می‌گذاریم
    const activeFilterButton = screen.getByRole('button', { name: /active/i });
    fireEvent.click(activeFilterButton);

    // افزودن تسک جدید
    fireEvent.change(input, { target: { value: 'Buy milk' } });
    fireEvent.click(addButton);

    // چون تسک جدید Active است، باید در Active دیده شود
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });
});
