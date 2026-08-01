import { describe, it, expect } from "vitest";
import { filterBySearch } from "../utils/taskUtils";
import type { Task } from "../types/Task";

describe("filterBySearch", () => {
    it("returns the task list if search text is empty", () => {
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
        const searchText: string = "";
        const result = filterBySearch(tasks, searchText);
        expect(result).toEqual(tasks);
    });
    it("returns the task list if the search text is just a bunch of empty spaces", () => {
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
        const searchText: string = "           ";
        const result = filterBySearch(tasks, searchText);
        expect(result).toEqual(tasks);
    });
    it("returns an empty list if the text doesn't match any of the tasks", () => {
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
        const searchText: string = "four";
        const result = filterBySearch(tasks, searchText);
        expect(result).toEqual([]);
    });
    it("returns all items if all items has the text", () => {
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
        const searchText: string = "Task";
        const result = filterBySearch(tasks, searchText);
        expect(result).toEqual(tasks);
    });
    it("returns all items if all items has the text non-case sensitive", () => {
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
        const searchText: string = "task";
        const result = filterBySearch(tasks, searchText);
        expect(result).toEqual(tasks);
    });
    it("returns just the first task if that's the only thing that contains the text", () => {
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
        const searchText: string = "one";
        const result = filterBySearch(tasks, searchText);
        expect(result).toEqual([tasks[0]]);
    });
    it("returns the first and second tasks if those are the only things that contain the text", () => {
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
                title: "Task two one",
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
        const searchText: string = "one";
        const result = filterBySearch(tasks, searchText);
        expect(result).toEqual([tasks[0], tasks[1]]);
    });
});