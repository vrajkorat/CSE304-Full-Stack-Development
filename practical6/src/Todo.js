import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Todo({ task, deleteTask, editTask }) {
  return (
    <div className="task-item">
      <span>{task.text}</span>
      <div className="task-icons">
        <FaEdit onClick={() => editTask(task.id)} className="icon" />
        <FaTrash onClick={() => deleteTask(task.id)} className="icon" />
      </div>
    </div>
  );
}

export default Todo;