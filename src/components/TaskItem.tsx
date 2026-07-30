import type { Task } from "../types/Task";

interface TaskItemProps { //props interfaces make sure the data is correct
    task: Task; //"TaskItem requires a task, and it must be a real Task."
}

function TaskItem({ task }: TaskItemProps) {
    return (
        <>
            <li>{task.title}</li>
        </>
    )
} 

export { TaskItem };