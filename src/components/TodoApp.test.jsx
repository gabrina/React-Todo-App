// src/components/TodoApp.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from './TodoApp';

describe('TodoApp - handleAddTodo', () => {
    beforeEach(() => {
        // clear DOM
    });


    it('should show alert and not add todo when input is empty', () => {
        // prevent alert from stopping the test
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => { });

        //much alike the main render, but just in test
        render(<TodoApp />);

        // finging button
        // const input = screen.getByPlaceholderText(/add a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });


        // expect(input.value).toBe('');


        // click add button
        fireEvent.click(addButton);

        // assertion: an alert must be shown with the text: Task can't be empty
        expect(alertSpy).toHaveBeenCalledWith("Task can't be empty");


        // const listItems = screen.queryAllByRole('listitem');
        // expect(listItems.length).toBe(0);

        // assertion: check the DOM for Sample Task
        const todoText = screen.queryByText('Sample Task');
        expect(todoText).not.toBeInTheDocument();

        alertSpy.mockRestore();
    });



    it('should add a new todo when input is valid', () => {
        render(<TodoApp />);

        // finging text box and button
        const input = screen.getByPlaceholderText(/add a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });

        // Valid Input TestCase: Sample Task
        fireEvent.change(input, { target: { value: 'Sample Task' } });
        expect(input.value).toBe('Sample Task');

        // click add button
        fireEvent.click(addButton);

        // assertion: new task must appear in the list
        const listItem = screen.getByText('Sample Task');
        expect(listItem).toBeInTheDocument();

        // assertion: expecting the input to be empty, after task is created
        expect(input.value).toBe('');
    });
});
