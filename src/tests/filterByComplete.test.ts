import { describe, it, expect } from "vitest";
import { filterByComplete } from "../utils/taskUtils";
import type { Task } from "../types/Task";
import type { Priority } from "../types/Priority"; 

describe("filterByComplete", () => {
    it("returns all tasks if it isn't checked", () => {
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
        const checked = false;
        const result = filterByComplete(tasks, checked);
        expect(result).toEqual(tasks);
    });
    it("returns only incomplete tasks if it is checked", () => {
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
        const checked = true;
        const result = filterByComplete(tasks, checked);
        expect(result).toEqual([
            {
                id: 2,
                title: "Task two",
                completed: false,
                date: new Date(),
                priority: "LOW",
            }
        ]);
    });
    it("returns nothing if the tasks are all complete and it is checked", () => {
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
        ];
        const checked = true;
        const result = filterByComplete(tasks, checked);
        expect(result).toEqual([]);
    });
});