import type { Task } from "./types/Task"; 
import type { Priority } from "./types/Priority";
import type { DueDate } from "./types/DueDate";
import TaskItem from "./components/TaskItem";
import AddTaskModal from "./components/AddTaskModal";
import UploadCSVModal from "./components/UploadCSVModal";
import DeleteCompletedTasks from "./components/DeleteCompleted";
import { calculateProgress } from "./utils/calculateProgress";
import { filterByPriority, filterByComplete, filterByDueDate, filterBySearch } from "./utils/taskUtils";
import { initialTasks } from "./utils/initialTasks";
import { uploadCSV } from "./utils/parseCSV";
import { removeCompletedTasks } from "./utils/deleteCompleted";
import "./styles/App.css";

import { useState } from "react";

function App() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [showModal, setShowModal] = useState(false);
    const [showCSVModal, setShowCSVModal] = useState(false);
    const [showDeleteComplete, setShowDeleteComplete] = useState(false);
    const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]);
    const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
    const [selectedDueDate, setSelectedDueDate] = useState<DueDate[]>([]);
    const [searchText, setSearchText] = useState("");

    let currentDate = new Date();
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

    function closeCSVModal() {
        setShowCSVModal(false);
    } 

    const handleCSVUpload = async (file: File) => {
        const importedTasks = await uploadCSV(file);
        setTasks([...tasks, ...importedTasks]);
    } 

    function closeDeleteModal() {
        setShowDeleteComplete(false);
    } 

    function deleteCompletedTasks() {
        setTasks(removeCompletedTasks(tasks));
        setShowDeleteComplete(false);
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

    function handleDueDate(dueDate: DueDate) {
        //this function updates the list that will be used to keep track of which due dates need to be included
        //if it is selected, remove it
        //if it hasn't been selected, add it
        if (selectedDueDate.includes(dueDate)) {
            setSelectedDueDate(
                selectedDueDate.filter((item) => item !== dueDate)
            );
        } else {
            setSelectedDueDate([
                ...selectedDueDate,
                dueDate
            ]);
        }
    }

    //filter pipeline
    const priorityFilteredTasks = filterByPriority(tasks, selectedPriorities);
    const completeFilteredTasks = filterByComplete(priorityFilteredTasks, showOnlyIncomplete);
    const dueDateFilteredTasks = filterByDueDate(completeFilteredTasks, selectedDueDate, currentDate);
    const searchFilteredTasks = filterBySearch(dueDateFilteredTasks, searchText);
    const visibleTasks = searchFilteredTasks;
    

    return (
        <main className="app">
            <div className="leftSideBar">
                <h2>Todo List</h2>
                <p id="date-display">{currentDate.toDateString()}</p>
                <p id="progress-display" className={currentProgress < 50 ? "regular-progress" : "green-progress"}>Progress: {currentProgress}%</p>
                <div className="filterArea">
                    <h3>Filters</h3>
                    <div className="searchFilter">
                        <h4>Search</h4>
                        <label>
                            <input type="text" placeholder="Search tasks by name..." value={searchText} onChange={(event) => setSearchText(event.target.value)} />
                        </label>
                    </div>
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
                        <label>
                            <input type="checkbox" checked={showOnlyIncomplete} onChange={(event) => setShowOnlyIncomplete(event.target.checked)} />
                            Only show incomplete items
                        </label>
                    </div>  
                    <div className="dueDateFilter">
                        <h4>Due Date</h4>
                        <label>
                            <input type="checkbox" checked={selectedDueDate.includes("OVERDUE")} onChange={() => handleDueDate("OVERDUE")} />
                            Overdue
                        </label>
                        <label>
                            <input type="checkbox" checked={selectedDueDate.includes("TODAY")} onChange={() => handleDueDate("TODAY")} />
                            Due today
                        </label>
                        <label>
                            <input type="checkbox" checked={selectedDueDate.includes("UPCOMING")} onChange={() => handleDueDate("UPCOMING")} />
                            Upcoming
                        </label>
                    </div>
                </div>
                <div className="taskAdditionArea">
                    <button onClick={() => {
                        setShowModal(true);
                        setShowCSVModal(false);
                        setShowDeleteComplete(false);
                    }}>
                        + Task
                    </button>
                    <button onClick={() => {
                        setShowModal(false);
                        setShowCSVModal(true);
                        setShowDeleteComplete(false);
                    }}>
                        Upload CSV
                    </button>
                    <button onClick={() => {
                        setShowModal(false);
                        setShowCSVModal(false);
                        setShowDeleteComplete(true);
                    }}>
                        Delete Completed Tasks
                    </button>
                </div>
            </div>
            <div className="rightSideBar">
                <div className="toDoListArea">
                    {/* to-do list appears here with title, delete button, and prioirty*/}
                    <ul className="taskList">
                        {visibleTasks.length === 0 ? (
                            <li className="noTasks">No Tasks</li>
                        ) : (
                            visibleTasks.map((task) => (
                                <TaskItem key={task.id} task={task} onToggle={toggleTask} currentDate={currentDate} />
                            ))
                        )}
                    </ul>
                    {/*modals*/}
                    {/* Notes for just this addTaskModal to help create other modals:
                    onClose is what it's called in the props, closeAddTaskModal is the function here.  */}
                    {showModal && (
                        <AddTaskModal onClose={closeAddTaskModal} onAddTask={addTask} /> 
                    )}
                    {showCSVModal && (
                        <UploadCSVModal onClose={closeCSVModal} handleCSVUpload={handleCSVUpload} />
                    )}
                    {showDeleteComplete && ( 
                        <DeleteCompletedTasks onClose={closeDeleteModal} tasks={tasks} deleteCompleteTasks={deleteCompletedTasks} />
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
