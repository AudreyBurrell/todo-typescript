import type { Task } from "../types/Task";

export function uploadCSV(file: File): Promise<Task[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

reader.onload = () => {
        try {
            const csvText = reader.result as string;

            const dataLines: string[] = csvText
                .split(/\r?\n/)
                .slice(3)
                .filter((line: string) => line.trim() !== "");

            const tasks: Task[] = [];
            const allowedPriorities = new Set(["HIGH", "MEDIUM", "LOW"]);

            dataLines.forEach((line, index) => {
                const values = line
                    .split(",")
                    .map(value => value.trim());

                const lineNumber = index + 4;

                if (values.length !== 4) {
                    throw new Error(
                        `Line ${lineNumber}: Expected exactly four values.`
                    );
                }

                const [
                    titleValue,
                    dateValue,
                    priorityValue,
                    completedValue
                ] = values;

                if (!titleValue) {
                    throw new Error(
                        `Line ${lineNumber}: Title is required.`
                    );
                }

                const date = new Date(dateValue);

                if (!dateValue || Number.isNaN(date.getTime())) {
                    throw new Error(
                        `Line ${lineNumber}: Date is missing or invalid.`
                    );
                }

                const normalizedPriority = priorityValue.toUpperCase();

                if (!allowedPriorities.has(normalizedPriority)) {
                    throw new Error(
                        `Line ${lineNumber}: Priority must be HIGH, MEDIUM, or LOW.`
                    );
                }

                const normalizedCompleted = completedValue.toLowerCase();

                if (
                    normalizedCompleted !== "true" &&
                    normalizedCompleted !== "false"
                ) {
                    throw new Error(
                        `Line ${lineNumber}: Completed must be true or false.`
                    );
                }

                tasks.push({
                    id: Date.now(),
                    title: titleValue,
                    date,
                    priority: normalizedPriority as "HIGH" | "MEDIUM" | "LOW",
                    completed: normalizedCompleted === "true"
                });
            });

            resolve(tasks);
        } catch (error) {
            reject(error);
        }
    };

        reader.readAsText(file);
    });
}