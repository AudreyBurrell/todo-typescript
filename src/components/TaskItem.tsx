import type { Task } from "../types/Task";

interface TaskItemProps { //props interfaces make sure the data is correct
    task: Task; //"TaskItem requires a task, and it must be a real Task."
    onToggle: (id: number) => void; //this prop is a function that recieves the number id and returns nothing
}

function TaskItem({ task, onToggle }: TaskItemProps) {
    return (
        <>
            <li>
                {task.title}  

                <button onClick={() => onToggle(task.id)}>
                    {task.completed ? "Undo" : "Complete"}
                </button>
            </li>
        </>
    )
} 

export default TaskItem;