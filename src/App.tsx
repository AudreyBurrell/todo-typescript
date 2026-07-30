import type { Task } from "./types/Task"; 
import TaskItem from "./components/TaskItem";
import "./styles/App.css";

import { useState, useEffect } from "react";

function App() {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: "Finish TypeScript Todo App",
            completed: false,
            date: new Date(2026, 6, 29),
            priority: "HIGH",
        },
        {
            id: 2,
            title: "Study React hooks",
            completed: true,
            date: new Date(2026, 6, 29),
            priority: "MEDIUM",
        },
        {
            id: 3,
            title: "Read Frankenstein chapters 3-5",
            completed: false,
            date: new Date(2026, 6, 29),
            priority: "LOW",
        },
        {
            id: 4,
            title: "Submit internship application",
            completed: false,
            date: new Date(2026, 6, 30),
            priority: "HIGH",
        },
        {
            id: 5,
            title: "Go grocery shopping",
            completed: false,
            date: new Date(2026, 6, 30),
            priority: "MEDIUM",
        },
        {
            id: 6,
            title: "Organize computer files",
            completed: true,
            date: new Date(2026, 6, 28),
            priority: "LOW",
        },
        {
            id: 7,
            title: "Practice LeetCode problems",
            completed: false,
            date: new Date(2026, 6, 31),
            priority: "HIGH",
        },
    ]);
    useEffect(() => {
        updateProgress();
    }, [tasks]); 


    const [currentProgress, setProgress] = useState(0);


    let currentDate = new Date().toDateString();
    const totalTasks = tasks.length;
    
    function updateProgress() {
        let completeTasks = 0;
        for (let task of tasks) {
            if (task.completed) {
                completeTasks++;
            }
        }
        let newProgress = Math.round((completeTasks / totalTasks) * 100);
        setProgress(newProgress);
    }

    function toggleTask(id: number) {
        setTasks(
            tasks.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        completed: !task.completed
                    }
                } else {
                    return task;
                }
            })
        )
    } 

    

    return (
        <main className="app">
            <div className="leftSideBar">
                <h2>Todo List</h2>
                <p id="date-display">{currentDate}</p>
                <p id="progress-display" className={currentProgress < 50 ? "regular-progress" : "green-progress"}>Progress: {currentProgress}%</p>
                <div className="filterArea">
                    {/*When ready, filtering stuff goes here */}
                </div>
                <div className="navigation">
                    <button>&#x276E; Previous</button>
                    <button>Next &#x276F;</button>
                </div>
                <div className="taskAdditionArea">
                    <button>+ Task</button>
                    <button>Upload CSV</button>
                </div>
            </div>
            <div className="rightSideBar">
                <div className="toDoListArea">'
                    {/* to-do list appears here with title, delete button, and prioirty*/}
                    <ul className="taskList">
                        {tasks.map((task) => (
                            <TaskItem key={task.id} task={task} onToggle={toggleTask} />
                        ))}
                    </ul>
                </div>
            </div>
        
        </main>
    )
} 

export default App; 

//HOW AI HAS BEEN USED ON THIS PART
    //debugging
    //CSS