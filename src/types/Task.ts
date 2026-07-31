import type { Priority } from "./Priority";

export interface Task {
    id: number;
    title: string;
    completed: boolean;
    date: Date;
    priority: Priority;
}