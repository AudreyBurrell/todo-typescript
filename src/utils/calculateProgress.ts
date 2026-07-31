import type { Task } from "../types/Task";

export function calculateProgress(tasks: Task[]): number {
    let completeTasks = 0;
    for (let task of tasks) {
        if (task.completed) {
            completeTasks++;
        }
    }
    if (completeTasks === 0) {
        return 0;
    }
    return Math.round((completeTasks / tasks.length) * 100);
}