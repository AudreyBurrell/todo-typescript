import type { Task } from "../types/Task";

export function calculateProgress(tasks: Task[]): number {
    let completeTasks = 0;
    for (let task of tasks) {
        if (task.completed) {
            completeTasks++;
        }
    }
    return Math.round((completeTasks / tasks.length) * 100);
}