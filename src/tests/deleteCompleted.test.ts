import { describe, it, expect } from "vitest";
import { removeCompletedTasks } from "../utils/deleteCompleted";
import type { Task } from "../types/Task"; 

describe("removeCompletedTasks", () => {
    it("returns an empty list if all tasks have been completed", () => {
        const tasks: Task[] = [
            {
                id: 1,
                title: "Task one",
                completed: true,
                date: new Date(),
                priority: "HIGH",
            },
            {
                id: 2,
                title: "Task two",
                completed: true,
                date: new Date(),
                priority: "LOW",
            },
            {
                id: 3,
                title: "Task three",
                completed: true,
                date: new Date(),
                priority: "MEDIUM"
            },
        ];
        const result = removeCompletedTasks(tasks);
        expect(result).toEqual([]);
    });
});