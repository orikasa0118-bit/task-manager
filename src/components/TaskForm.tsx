import { useState, FormEvent } from 'react';

interface TaskFormProps {
  onSubmit: (title: string) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setTitle('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいタスクを入力..."
        className="task-input"
      />
      <button type="submit" className="task-button">
        追加
      </button>
    </form>
  );
}
