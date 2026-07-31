import type { Task } from "../types/Task";
import type { Priority } from "../types/Priority";

export function filterByPriority(tasks: Task[], selectedPriorities: Priority[]): Task[] {
    //if no priorities are selected, show every task
    if (selectedPriorities.length === 0) {
        return tasks;
    } 
    //now returning based on selected priorities
    let newTasks = tasks.filter(task => selectedPriorities.includes(task.priority));
    return newTasks;
} 

export function filterByComplete(tasks: Task[], checked: boolean): Task[] {
    if(checked) {
        return tasks.filter(task => task.completed == false);
    } else {
        return tasks;
    }
}