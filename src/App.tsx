import type { Task } from "./types/Task"; 
import type { Priority } from "./types/Priority";
import TaskItem from "./components/TaskItem";
import AddTaskModal from "./components/AddTaskModal";
import { calculateProgress } from "./utils/calculateProgress";
import { filterByPriority } from "./utils/taskUtils";
import { initialTasks } from "./utils/initialTasks";
import "./styles/App.css";

import { useState } from "react";

function App() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [showModal, setShowModal] = useState(false);
    const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]);

    let currentDate = new Date().toDateString();
    const currentProgress = calculateProgress(tasks);

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

    function addTask(task: Task) {
        setTasks([...tasks, task]);
        setShowModal(false);
    }

    function closeAddTaskModal() {
        setShowModal(false);
    } 

    function handlePriorities(priority: Priority) {
        //this function just updates the list that will be used to keep track of which priorities need to be included
        //if it is selected, remove it
        //if it hasn't been selected, add it
        if (selectedPriorities.includes(priority)) {
            setSelectedPriorities(
                selectedPriorities.filter((item) => item !== priority)
            );
        } else {
            setSelectedPriorities([
                ...selectedPriorities,
                priority
            ])
        }   
    } 

    const visibleTasks = filterByPriority(tasks, selectedPriorities);

    

    return (
        <main className="app">
            <div className="leftSideBar">
                <h2>Todo List</h2>
                <p id="date-display">{currentDate}</p>
                <p id="progress-display" className={currentProgress < 50 ? "regular-progress" : "green-progress"}>Progress: {currentProgress}%</p>
                <div className="filterArea">
                    {/* 
                    Filter options:
                    1. Only display certain priorities (checkboxes, not radio buttons, to allow for multiple)
                    2. Only display incomplete items
                    3. Sort by priority
                    
                    Search bar
                    */}
                    <h3>Filters</h3>
                    <div className="priorityFilter">
                        <h4>Priority</h4>
                        <label>
                            <input type="checkbox" checked={selectedPriorities.includes("HIGH")} onChange={() => handlePriorities("HIGH")} />
                            High
                        </label>
                        <label>
                            <input type="checkbox" checked={selectedPriorities.includes("MEDIUM")} onChange={() => handlePriorities("MEDIUM")} />
                            Medium
                        </label>
                        <label>
                            <input type="checkbox" checked={selectedPriorities.includes("LOW")} onChange={() => handlePriorities("LOW")} />
                            Low
                        </label>
                    </div>
                </div>
                <div className="navigation">
                    <button>&#x276E; Previous</button>
                    <button>Next &#x276F;</button>
                </div>
                <div className="taskAdditionArea">
                    <button onClick={() => setShowModal(true)}>+ Task</button>
                    <button>Upload CSV</button>
                </div>
            </div>
            <div className="rightSideBar">
                <div className="toDoListArea">'
                    {/* to-do list appears here with title, delete button, and prioirty*/}
                    <ul className="taskList">
                        {visibleTasks.map((task) => (
                            <TaskItem key={task.id} task={task} onToggle={toggleTask} />
                        ))}
                    </ul>
                    {/*modals*/}
                    {/* Notes for just this addTaskModal to help create other modals:
                    onClose is what it's called in the props, closeAddTaskModal is the function here.  */}
                    {showModal && (
                        <AddTaskModal onClose={closeAddTaskModal} onAddTask={addTask} /> 
                    )}
                </div>
            </div>
        
        </main>
    )
} 

export default App; 

//HOW AI HAS BEEN USED ON THIS PART
    //debugging
    //CSS
    //figuring out the addTaskModal and what goes in the props