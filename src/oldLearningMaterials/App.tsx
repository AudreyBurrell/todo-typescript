import './styles/App.css'

import type { Task } from "./types/Task";
import  TaskItem  from "./components/TaskItem";
import { useState } from "react";

function App() {
  //the states
  const [newTask, setNewTask] = useState("");
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

  function addTask(event: React.FormEvent) {
    event.preventDefault();
    //checking for empty
    if (newTask.trim() === "") {
      return;
    }
    //create a new task object
    const task: Task = {
      id: Date.now(),
      title: newTask,
      completed: false
    };
    //add it to the tasks array
    setTasks((previousTasks) => [
      ...previousTasks,
      task
    ]);
    //clear the input
    setNewTask(""); //sets the newTask to ""
  }

  return (
    <main className="app">
      <h1>My Todo List</h1>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={toggleTask} />
        ))}
      </ul>
      {/* adding a task */}
      <form onSubmit={addTask}>
        <input value= {newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="Add a task..." />
        <button type="submit">+ Add</button>  
      </form>
      
    </main>
  )
}

export default App
