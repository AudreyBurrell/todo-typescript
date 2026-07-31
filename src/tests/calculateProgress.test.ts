import { describe, it, expect } from "vitest";
import { calculateProgress } from "../utils/calculateProgress";
import type { Task } from "../types/Task";

describe("calculateProgress", () => {
    it("returns the correct percentage of completed tasks", () => {
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
        const result = calculateProgress(tasks);
        expect(result).toBe(50);
    });
    it("returns 0 when it has no tasks", () => {
        expect(calculateProgress([])).toBe(0);
    });
    it("returns 100 when all tasks are complete", () => {
        const tasks: Task[] = 
        [
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
        const result = calculateProgress(tasks);
        expect(result).toBe(100);
    });
    it("returns 0 when no tasks are complete", () => {
        const tasks: Task[] = 
        [
            {
                id: 1,
                title: "Task one",
                completed: false,
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
        const result = calculateProgress(tasks);
        expect(result).toBe(0);
    })
})


/* 
Notes that chat gave me about tests
1. Arrange. Create the situation.
2. Act. Run the thing that you are testing.
3. Check the result. Example: expect(result).toBe(50)

Describe groups related tests. All tests about the function goes under it.
it describes the behavior
expect is the actual check

run the test with npm test
*/