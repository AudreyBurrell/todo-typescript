import type { Task } from "../types/Task";

export const initialTasks: Task[] = [
    {
        id: 1,
        title: "Finish TypeScript Todo App",
        completed: false,
        date: new Date(2026, 6, 29),
        priority: "HIGH",
    },
];