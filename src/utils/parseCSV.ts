import type { Task } from "../types/Task";

export function uploadCSV(file: File): Promise<Task[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const csvText = reader.result as string;

            const dataLines: string[] = csvText
                .split(/\r?\n/)
                .slice(3)
                .filter((line: string) => line.trim() !== "");

            const tasks: Task[] = [];

            dataLines.forEach((line: string) => {
                const values: string[] = line
                    .split(",")
                    .map(value => value.trim());

                const title: string = values[0];
                const date: Date = new Date(values[1]);
                const priority = values[2] as "HIGH" | "MEDIUM" | "LOW";
                const completed: boolean = values[3].toLowerCase() === "true";

                const newTask: Task = {
                    id: Date.now(),
                    title,
                    date,
                    priority,
                    completed
                };

                tasks.push(newTask);
            });

            resolve(tasks);
        };

        reader.onerror = () => {
            reject(reader.error);
        };

        reader.readAsText(file);
    });
}