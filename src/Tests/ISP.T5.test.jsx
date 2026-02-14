import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp';

describe('T5 - normal title, empty list, filter All', () => {
  it('T5 - should add first task when list is initially empty', () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // پیش‌شرط: لیست خالی است
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Buy milk' } });
    fireEvent.click(addButton);

    // انتظار: تسک جدید اضافه شود
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    // پیام خالی بودن لیست حذف شود
    expect(screen.queryByText(/no tasks yet/i)).not.toBeInTheDocument();
    expect(input.value).toBe('');
  });
});
