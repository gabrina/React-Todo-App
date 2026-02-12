// src/components/TodoApp.jsx
import { useState } from 'react';
import TodoItem from './TodoItem';

const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState(FILTERS.ALL);

  function handleAddTodo(e) {
    e.preventDefault();
    const title = inputValue.trim();
    if (!title) {
      alert("Task can't be empty");
      return;
    }

    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputValue('');
    return;
  }


  function handleToggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDeleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function handleChangeFilter(newFilter) {
    setFilter(newFilter);
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === FILTERS.ACTIVE) return !todo.completed;
    if (filter === FILTERS.COMPLETED) return todo.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className="todo-filters">
        <button
          type="button"
          className={filter === FILTERS.ALL ? 'active' : ''}
          onClick={() => handleChangeFilter(FILTERS.ALL)}
        >
          All
        </button>
        <button
          type="button"
          className={filter === FILTERS.ACTIVE ? 'active' : ''}
          onClick={() => handleChangeFilter(FILTERS.ACTIVE)}
        >
          Active
        </button>
        <button
          type="button"
          className={filter === FILTERS.COMPLETED ? 'active' : ''}
          onClick={() => handleChangeFilter(FILTERS.COMPLETED)}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.length === 0 && (
          <li className="todo-empty">No tasks yet.</li>
        )}
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
