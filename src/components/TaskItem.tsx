import type { Task } from "../types/Task";
import { determineTime } from "../utils/taskUtils";

interface TaskItemProps {
    task: Task;
    onToggle: (id: number) => void;
    currentDate: Date;
}

function TaskItem({task, onToggle, currentDate}: TaskItemProps) { 

    function getDueDateLabel(currentDate: Date, taskDate: Date): string {
        if (determineTime(currentDate, taskDate, ["TODAY"])) {
            return "Due Today";
        }
        if (determineTime(currentDate, taskDate, ["UPCOMING"])) {
            return "Upcoming";
        }
        return "Overdue";
    } 

    return (
        <>
            <li className={task.completed ? "task task_completed" : "task"}>
                <span className="taskTitle">
                    {task.title}
                </span>
                <span className="dueDateDisplay">
                    {getDueDateLabel(currentDate, task.date)}
                </span>
                <span className={`priority priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                </span>
                <button onClick={() => onToggle(task.id)}>
                    {task.completed ? "↩ Undo" : "✓ Complete"}
                </button>
            </li>
        </>
    )
} 

export default TaskItem;