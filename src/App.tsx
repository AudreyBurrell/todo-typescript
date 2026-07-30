import './styles/App.css'

import type { Task } from "./types/Task";
import  TaskItem  from "./components/TaskItem";
import { useState } from "react";

function App() {
  //the states
  const [tasks, setTasks] = useState<Task[]>([
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
  ]); 

  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task, //copy everything from this object
            completed: !task.completed //but set completed to it's opposite
          };
        }
        return task; //just add on original object
      })
    )
  }

  return (
    <>
      <h1>My Todo List</h1>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={toggleTask} />
        ))}
      </ul>
    </>
  )
}

export default App
