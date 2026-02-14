import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp';

describe('T2 - very short title, non-empty list, filter All', () => {
  it('T2 - should add a very short but valid task title', () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // پیش‌شرط: لیست غیرخالی
    fireEvent.change(input, { target: { value: 'Existing task' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Existing task')).toBeInTheDocument();

    // عنوان خیلی کوتاه (مثلاً "a")
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.click(addButton);

    // انتظار: تسک 'a' اضافه شود
    expect(screen.getByText('a')).toBeInTheDocument();
    // input خالی شود
    expect(input.value).toBe('');
  });
});
