import type { Task } from "../types/Task";
import type { Priority } from "../types/Priority";
import type { DueDate } from "../types/DueDate";

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

function determineTime(currentDate: Date, testingDate: Date, dueDates: DueDate[]): boolean {
    //returns true or false if it matches one of the due dates in dueDates and is not completed yet.
    for (const dueDate of dueDates) {
        switch (dueDate) {
            case "TODAY":
                if (testingDate.getTime() === currentDate.getTime()) {
                    return true;
                }
                break; 
            case "UPCOMING":
                if (testingDate > currentDate) {
                    return true;
                }
                break; 
            case "OVERDUE":
                if (testingDate < currentDate) {
                    return true;
                }
                break; 
        }
    }
    return false;
}

export function filterByDueDate(tasks: Task[], selectedDueDates: DueDate[], currentDate: Date): Task[] {
    //go through the tasks with the date logic (maybe I could have a separate function for determining that actually)
    if(selectedDueDates.length === 0) {
        return tasks;
    }
    let newTasks = tasks.filter(task => !task.completed && task.date && determineTime(currentDate, task.date, selectedDueDates));
    return newTasks;
}