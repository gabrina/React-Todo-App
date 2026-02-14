import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '...components/TodoApp';

describe('T7 - normal title, non-empty list, filter Completed', () => {
  it('T7 - new active task should not appear under Completed until marked completed', () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // پیش‌شرط: یک تسک completed بسازیم
    fireEvent.change(input, { target: { value: 'Old task' } });
    fireEvent.click(addButton);

    const oldCheckbox = screen.getByRole('checkbox');
    fireEvent.click(oldCheckbox); // Old task → completed

    // فیلتر Completed
    const completedFilterButton = screen.getByRole('button', { name: /completed/i });
    fireEvent.click(completedFilterButton);

    // در این لحظه فقط Old task باید دیده شود
    expect(screen.getByText('Old task')).toBeInTheDocument();
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();

    // در حالت Completed یک تسک جدید (Active) اضافه می‌کنیم
    const inputAfterFilter = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(inputAfterFilter, { target: { value: 'Buy milk' } });
    fireEvent.click(addButton);

    // چون تسک جدید Active است، هنوز نباید در Completed دیده شود
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();

    // اگر بخواهیم مطمئن شویم واقعاً اضافه شده، فیلتر را روی All برمی‌گردانیم
    const allFilterButton = screen.getByRole('button', { name: /all/i });
    fireEvent.click(allFilterButton);
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });
});
