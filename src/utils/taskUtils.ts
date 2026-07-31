import type { Task } from "../types/Task";
import type { Priority } from "../types/Priority";

export function filterByPriority(tasks: Task[], selectedPriorities: Priority[]): Task[] {
    //if no priorities are selected, show every task
    if (selectedPriorities.length === 0) {
        return tasks;
    } 
    //temporary
    //return tasks;
}