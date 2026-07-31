import "../styles/AddTaskModal.css";
import { useState } from "react";
import type { Task } from "../types/Task"; 


interface addTaskProps {
    onClose: () => void; //onClose is the name of the prop, and is a function and returns nothing
    onAddTask: (task: Task) => void; //corresponds to the add task function in App.tsx
}

function AddTaskModal({ onClose, onAddTask } : addTaskProps) {
    const [title, setTitle] = useState(""); 
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState<Task["priority"]>("MEDIUM"); //NEED TO DO THIS BECAUSE IT CAN ONLY BE THREE STRING OPTIONS
    
    return (
        <>
            <div className="modalOverlay">
                <div className="modal">
                    <h2>Add Task</h2>
                    {/*NEED AN AREA TO:
                        1. Enter the title of the task
                        2. Enter the due date
                        3. Enter the priority
                        4. Add button   
                            a. when the add button is pressed:
                                1. Turn it into a task with the id, title, due date, priority, and completion (not in that order)
                                2. Send it back to be added
                    */}
                    <div className="addTaskFormArea">
                        <form>
                            <label>
                                Task: 
                                <input type="text" placeholder="Enter task..." value= {title} onChange={(event) => setTitle(event.target.value)} />
                            </label>
                            <label>
                                Date: 
                                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                            </label> 
                            <label>
                                Priority
                                <select value={priority} onChange={(event) => setPriority(event.target.value as Task["priority"])}> {/*The "as" tells the TS that it's one of the priority types*/}
                                    <option value="HIGH">High</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="LOW">Low</option>
                                </select>
                            </label>
                            <div className="modalButtons" onClick={() => onAddTask({
                                id: Date.now(),
                                title: title,
                                completed: false,
                                date: new Date(date),
                                priority: priority
                            })}>
                                <button type="submit">
                                    Add Task
                                </button>
                                <button type="button" onClick={onClose}>
                                    Cancel
                                </button>
                            </div>   
                        </form>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default AddTaskModal;