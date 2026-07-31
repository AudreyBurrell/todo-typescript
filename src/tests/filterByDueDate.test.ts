import { describe, it, expect } from "vitest";
import { filterByDueDate } from "../utils/taskUtils";
import type { Task } from "../types/Task";
import type { DueDate } from "../types/DueDate"; 


describe("filter by due date", () => {
    it("returns the full list when no due date is selected", () => {
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
        const currentDate: Date = new Date(2026, 7, 12);
        const result = filterByDueDate(tasks, [], currentDate);
        expect(result).toEqual([tasks[0], tasks[1], tasks[2]]);
    });
    it("returns only overdue when only OVERDUE is selected", () => {
        const tasks: Task[] = [
            {
                id: 1,
                title: "Task one",
                completed: false,
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
        const selectedDueDate: DueDate[] = ["OVERDUE"];
        const currentDate: Date = new Date(2026, 7, 12);
        const result = filterByDueDate(tasks, selectedDueDate, currentDate);
        expect(result).toEqual([tasks[0]]);
    });
    it("returns nothing when overdue is selected but everything from the past has been completed", () => {
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
        const selectedDueDate: DueDate[] = ["OVERDUE"];
        const currentDate: Date = new Date(2026, 7, 12);
        const result = filterByDueDate(tasks, selectedDueDate, currentDate);
        expect(result).toEqual([]);
    }); 
    it("returns both due today and upcoming when those are selected", () => {
        const tasks: Task[] = [
            {
                id: 1,
                title: "Task one",
                completed: false,
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
        const selectedDueDate: DueDate[] = ["DUE TODAY", "UPCOMING"];
        const currentDate: Date = new Date(2026, 7, 12);
        const result = filterByDueDate(tasks, selectedDueDate, currentDate);
        expect(result).toEqual([tasks[1], tasks[2]]);
    });
    it("returns both due today and upcoming but only those that are completed", () => {
        const tasks: Task[] = [
            {
                id: 1,
                title: "Task one",
                completed: false,
                date: new Date(2026, 6, 31),
                priority: "HIGH",
            },
            {
                id: 2,
                title: "Task two",
                completed: true,
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
        const selectedDueDate: DueDate[] = ["DUE TODAY", "UPCOMING"];
        const currentDate: Date = new Date(2026, 7, 12);
        const result = filterByDueDate(tasks, selectedDueDate, currentDate);
        expect(result).toEqual([tasks[2]]);
    });
    it("returns everything if everything is selected", () => {
        const tasks: Task[] = [
            {
                id: 1,
                title: "Task one",
                completed: false,
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
        const selectedDueDate: DueDate[] = ["DUE TODAY", "UPCOMING", "OVERDUE"];
        const currentDate: Date = new Date(2026, 7, 12);
        const result = filterByDueDate(tasks, selectedDueDate, currentDate);
        expect(result).toEqual([tasks[0], tasks[1], tasks[2]]);
    });
    it("returns nothing if everything is selected but everything is also completed", () => {
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
                completed: true,
                date: new Date(2026, 7, 13),
                priority: "LOW",
            },
            {
                id: 3,
                title: "Task three",
                completed: true,
                date: new Date(2026, 7, 12),
                priority: "MEDIUM",
            },
        ]; 
        const selectedDueDate: DueDate[] = ["DUE TODAY", "UPCOMING", "OVERDUE"];
        const currentDate: Date = new Date(2026, 7, 12);
        const result = filterByDueDate(tasks, selectedDueDate, currentDate);
        expect(result).toEqual([]);
    });
    it("returns only tasks due today", () => {
         const tasks: Task[] = [
            {
                id: 1,
                title: "Task one",
                completed: false,
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
        const selectedDueDate: DueDate[] = ["DUE TODAY"];
        const currentDate: Date = new Date(2026, 7, 12);
        const result = filterByDueDate(tasks, selectedDueDate, currentDate);
        expect(result).toEqual([tasks[1]]);
    });
    it("returns only upcoming tasks", () => {
        const tasks: Task[] = [
            {
                id: 1,
                title: "Task one",
                completed: false,
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
        const selectedDueDate: DueDate[] = ["UPCOMING"];
        const currentDate: Date = new Date(2026, 7, 12);
        const result = filterByDueDate(tasks, selectedDueDate, currentDate);
        expect(result).toEqual([tasks[2]]);
    });
    it("returns an empty list when there are no tasks", () => {
        const result = filterByDueDate([], ["OVERDUE"], new Date(2026, 7, 12));
        expect(result).toEqual([]);
    });
}); 




// export function filterByDueDate(tasks: Task[], selectedDueDates: DueDate[], currentDate: Date): Task[] {

// }