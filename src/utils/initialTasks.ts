import type { Task } from "../types/Task";

export const initialTasks: Task[] = [
    {
        id: 1,
        title: "Finish TypeScript Todo App",
        completed: false,
        date: new Date(2026, 6, 29),
        priority: "HIGH",
    },
    {
        id: 2,
        title: "Practice interview problems",
        completed: true,
        date: new Date(2026, 6, 28),
        priority: "MEDIUM",
    },
    {
        id: 3,
        title: "Get resume check",
        completed: false,
        date: new Date(2026, 6, 29),
        priority: "HIGH",
    },
];