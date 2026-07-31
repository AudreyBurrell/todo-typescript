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
    it("returns just the high tasks when just the HIGH priority is selected", () => {
        const tasks: Task[] = [
            {
                id: 1,
                title: "Task one",
                completed: true,
                date: new Date(2026, 6, 31),
                priority: "HIGH",
            },
            {
                id: 2,
                title: "Task two",
                completed: false,
                date: new Date(2026, 7, 13),
                priority: "LOW",
            },
            {
                id: 3,
                title: "Task three",
                completed: false,
                date: new Date(2026, 7, 12),
                priority: "MEDIUM",
            },
        ];
        const selectedPriorities: Priority[] = ["HIGH"];
        const result = filterByPriority(tasks, selectedPriorities);
        expect(result).toEqual([
            {
                id: 1,
                title: "Task one",
                completed: true,
                date: new Date(2026, 6, 31),
                priority: "HIGH",
            }
        ]);
    });
    it("returns LOW and MEDIUM when those two priorities are selected", () => {
        const tasks: Task[] = [
            {
                id: 1,
                title: "Task one",
                completed: true,
                date: new Date(2026, 6, 31),
                priority: "HIGH",
            },
            {
                id: 2,
                title: "Task two",
                completed: false,
                date: new Date(2026, 7, 13),
                priority: "LOW",
            },
            {
                id: 3,
                title: "Task three",
                completed: false,
                date: new Date(2026, 7, 12),
                priority: "MEDIUM",
            },
        ];
        const selectedPriorities: Priority[] = ["LOW", "MEDIUM"];
        const result = filterByPriority(tasks, selectedPriorities);
        expect(result).toEqual([
            {
                id: 2,
                title: "Task two",
                completed: false,
                date: new Date(2026, 7, 13),
                priority: "LOW",
            },
            {
                id: 3,
                title: "Task three",
                completed: false,
                date: new Date(2026, 7, 12),
                priority: "MEDIUM",
            },
        ]);
    });
    it ("returns nothing when there are no matching priorities", () => {
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
        const selectedPriorities: Priority[] = ["MEDIUM"];
        const result = filterByPriority(tasks, selectedPriorities);
        expect(result).toEqual([]);
    });
});