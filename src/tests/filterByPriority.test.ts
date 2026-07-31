import { describe, it, expect } from "vitest";
import { filterByPriority } from "../utils/taskUtils";
import type { Task } from "../types/Task";
import type { Priority } from "../types/Priority"; 

describe ("filterByPriority", () => {
    it("returns all tasks when no priorities are selected", () => {
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
                completed: false,
                date: new Date(),
                priority: "LOW",
            },
        ];
        const selectedPriorities: Priority[] = [];
        const result = filterByPriority(tasks, selectedPriorities);
        expect(result).toEqual(tasks);
    });
})