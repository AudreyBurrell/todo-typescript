import type { Task } from "../types/Task"; 

export function removeCompletedTasks(tasks: Task[]): Task[] {
    return tasks.filter(task => !task.completed);
}