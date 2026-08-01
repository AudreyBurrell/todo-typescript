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
    
    function parseLocalDate(dateString: string): Date {
        const [year, month, day] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day); // local midnight, not UTC
    }
    
    return (
        <>
            <div className="modalOverlay">
                <div className="modal">
                    <h2>Add Task</h2>
                    <div className="addTaskFormArea">
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            onAddTask({
                                id: Date.now(),
                                title: title,
                                completed: false,
                                date: parseLocalDate(date),
                                priority: priority
                            });
                        }}>
                            <label>
                                Task: 
                                <input type="text" placeholder="Enter task..." value={title} onChange={(event) => setTitle(event.target.value)} />
                            </label>
                            <label>
                                Date: 
                                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                            </label> 
                            <label>
                                Priority
                                <select value={priority} onChange={(event) => setPriority(event.target.value as Task["priority"])}>
                                    <option value="HIGH">High</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="LOW">Low</option>
                                </select>
                            </label>
                            <div className="modalButtons">
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