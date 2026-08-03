import "../styles/DeleteCompleted.css";
import type { Task } from "../types/Task";  

interface deleteCompletedProps {
    onClose: () => void; 
    tasks: Task[] ; 
    deleteCompleteTasks: () => void; 
} 

function DeleteCompletedTasks({ onClose, tasks, deleteCompleteTasks } : deleteCompletedProps) { 
    const completedCount = tasks.filter(task => task.completed).length;
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>
                    Are you sure you want to permanently delete {completedCount} completed {completedCount === 1 ? "task" : "tasks"}?
                </h2>
                <div className="btnOptions">
                    <button onClick={onClose}>
                        Cancel
                    </button>
                    <button onClick={deleteCompleteTasks}>
                        Delete Completed Tasks
                    </button>
                </div>
            </div>
        </div>
    )
}
 

export default DeleteCompletedTasks;