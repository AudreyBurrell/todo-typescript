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
    const [priority, setPriority] = useState("");
    
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
                                <input type="text" placeholder="Enter task..." />
                            </label>
                            <label>
                                Date: 
                                <input type="date" />
                            </label> 
                            <label>
                                Priority
                                <select>
                                    <option value="HIGH">High</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="LOW">Low</option>
                                </select>
                            </label>
                        </form>
                    </div>
                    <div className="modalButtons">
                        <button type="submit">
                            Add Task
                        </button>
                        <button type="button">
                            Cancel
                        </button>
                    </div>   
                </div>
            </div>
        </>
    )
}

export default AddTaskModal;