import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/TodoApp';

describe('T1 - empty title, non-empty list, filter All', () => {
  it('T1 - should show alert and not add task when title is empty', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // پیش‌شرط: لیست را غیرخالی می‌کنیم
    fireEvent.change(input, { target: { value: 'Existing task' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Existing task')).toBeInTheDocument();

    // عنوان خالی (یا فقط فاصله) مطابق C1-B1
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);

    // انتظار: alert
    expect(alertSpy).toHaveBeenCalledWith("Task can't be empty");

    // انتظار: تسک جدیدی با عنوان مشخص (مثلاً Buy milk) اضافه نشود
    const todoText = screen.queryByText('Buy milk');
    expect(todoText).not.toBeInTheDocument();

    alertSpy.mockRestore();
  });
});
