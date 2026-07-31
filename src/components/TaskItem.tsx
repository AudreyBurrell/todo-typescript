import type { Task } from "../types/Task";

interface TaskItemProps {
    task: Task;
    onToggle: (id: number) => void;
}

function TaskItem({task, onToggle}: TaskItemProps) {
    return (
        <>
            <li className={task.completed ? "task task_completed" : "task"}>
                <span className="taskTitle">
                    {task.title}
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