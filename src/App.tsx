import './styles/App.css'

import type { Task } from "./types/Task";
import { TaskItem } from "./components/TaskItem";

function App() {
  //hard code values here for now
  const tasks: Task[] = [
    {
      id: 1,
      title: "Learn TypeScript",
      completed: false,
    },
    {
      id: 2,
      title: "Build Todo App",
      completed: false,
    }
  ];

  return (
    <>
      <h1>My Todo List</h1>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </>
  )
}

export default App
