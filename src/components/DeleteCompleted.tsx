import "../styles/DeleteCompleted.css";
import { useState } from "react";
import type { Task } from "../types/Task";  

interface deleteCompletedProps {
    onClose: () => void; //closing the popup
    tasks: Task[] ; //the current list of tasks
    deleteCompleteTasks: () => void; //what updates the tasks in the App.jsx
} 

function DeleteCompletedTasks({ onClose, tasks, deleteCompletedTasks } : deleteCompletedProps) {
    return (
        <div className="modal-overlay">
            <div className="modal">

            </div>
        </div>
    )
}
 

export default DeleteCompletedTasks;