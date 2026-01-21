import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm onSubmit={addTask} />
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;
