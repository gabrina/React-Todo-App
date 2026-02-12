// src/App.jsx
import { useState } from 'react';
import TodoApp from './components/TodoApp';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <TodoApp />
    </div>
  );
}

export default App;
