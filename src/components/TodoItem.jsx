// src/components/TodoItem.jsx

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className={todo.completed ? 'completed' : ''}>
          {todo.title}
        </span>
      </label>
      <button
        type="button"
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
      >
        ×
      </button>
    </li>
  );
}

export default TodoItem;
