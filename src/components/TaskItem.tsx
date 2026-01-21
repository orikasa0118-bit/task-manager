import { useState } from 'react';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    const trimmed = editTitle.trim();
    if (trimmed) {
      onUpdate(task.id, trimmed);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="task-checkbox"
      />
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="task-edit-input"
          autoFocus
        />
      ) : (
        <span className="task-title" onDoubleClick={() => setIsEditing(true)}>
          {task.title}
        </span>
      )}
      <div className="task-actions">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="task-button edit"
          >
            編集
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="task-button delete"
        >
          削除
        </button>
      </div>
    </li>
  );
}
