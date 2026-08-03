import { describe, it, expect } from "vitest";
import { uploadCSV } from "../utils/parseCSV";
import type { Task } from "../types/Task";

describe("UploadCSVModal", () => {
    it("returns an empty list when the CSV file is empty and there are no tasks already", async () => {
        const csvContent = "";
        const file = new File([csvContent], "testTasks.csv", {
            type: "text/csv"
        });
        const tasks = await uploadCSV(file);
        expect(tasks).toEqual([]);
    });
    it("returns the previous list of tasks when CSV file is empty but there are tasks already", async () => {
        const csvContent = "";
        const file = new File([csvContent], "testTasks.csv", {
            type: "text/csv"
        });
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
        const importedTasks = await uploadCSV(file);
        const newTasks = importedTasks.length === 0
            ? tasks
            : [...tasks, ...importedTasks];
        expect(newTasks).toEqual(tasks);
    });
    it("Returns an empty list if the CSV is just the first three lines (instructions) and there are no tasks yet", async () => {
        const csvContent = 
            `Instructions: Date format must be YYYY-MM-DD. Priority must be HIGH/MEDIUM/LOW. Completed must be true or false.

            Title,Date,Priority,Completed`; 
        const file = new File([csvContent], "testTasks.csv", {
            type: "text/csv"
        });
        const tasks = await uploadCSV(file);
        expect(tasks).toEqual([]);
    });
    it("Returns just the original tasks of the CSV is just the first three lines", async () => {
        const csvContent = 
            `Instructions: Date format must be YYYY-MM-DD. Priority must be HIGH/MEDIUM/LOW. Completed must be true or false.

            Title,Date,Priority,Completed`; 
        const file = new File([csvContent], "testTasks.csv", {
            type: "text/csv"
        });
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
        const importedTasks = await uploadCSV(file);
        const newTasks = importedTasks.length === 0
            ? tasks
            : [...tasks, ...importedTasks];
        expect(newTasks).toEqual(tasks);
    });
    it("only returns the fourth line if there is information", async () => {
        const csvContent = 
            `Instructions: Date format must be YYYY-MM-DD. Priority must be HIGH/MEDIUM/LOW. Completed must be true or false.

            Title,Date,Priority,Completed
            Testing Task, 2026-08-03, HIGH, false`;  
        const file = new File([csvContent], "testTasks.csv", {
            type: "text/csv"
        }); 
        const tasks = await uploadCSV(file);
        expect(tasks).toEqual([
            {
                id: expect.any(Number),
                title: "Testing Task",
                date: new Date("2026-08-03"),
                priority: "HIGH",
                completed: false
            }, 
        ]);
    });
    it("returns a valid task even if the completed status isn't all in lowercase", async () => {
        const csvContent = 
            `Instructions: Date format must be YYYY-MM-DD. Priority must be HIGH/MEDIUM/LOW. Completed must be true or false.

            Title,Date,Priority,Completed
            Testing Task, 2026-08-03, HIGH, FALSE
            Testing Task 2, 2026-08-04, MEDIUM, True
            Testing Task 3, 2026-08-05, LOW, fAlSe`;  
        const file = new File([csvContent], "testTasks.csv", {
            type: "text/csv"
        });
        const tasks = await uploadCSV(file);
        expect(tasks).toEqual([
            {
                id: expect.any(Number),
                title: "Testing Task",
                date: new Date("2026-08-03"),
                priority: "HIGH",
                completed: false
            },
            {
                id: expect.any(Number),
                title: "Testing Task 2",
                date: new Date("2026-08-04"),
                priority: "MEDIUM",
                completed: true
            },
            {
                id: expect.any(Number),
                title: "Testing Task 3",
                date: new Date("2026-08-05"),
                priority: "LOW",
                completed: false
            }
        ]);
    })
    it("returns valid CSV data with mutliple tasks", async () => {
        const csvContent = 
            `Instructions: Date format must be YYYY-MM-DD. Priority must be HIGH/MEDIUM/LOW. Completed must be true or false.

            Title,Date,Priority,Completed
            Testing Task, 2026-08-03, HIGH, false
            Testing Task 2, 2026-08-04, MEDIUM, true
            Testing Task 3, 2026-08-05, LOW, false`;  
        const file = new File([csvContent], "testTasks.csv", {
            type: "text/csv"
        });
        const tasks = await uploadCSV(file);
        expect(tasks).toEqual([
            {
                id: expect.any(Number),
                title: "Testing Task",
                date: new Date("2026-08-03"),
                priority: "HIGH",
                completed: false
            },
            {
                id: expect.any(Number),
                title: "Testing Task 2",
                date: new Date("2026-08-04"),
                priority: "MEDIUM",
                completed: true
            },
            {
                id: expect.any(Number),
                title: "Testing Task 3",
                date: new Date("2026-08-05"),
                priority: "LOW",
                completed: false
            }
        ]);
    });
    it("throws an error when there is no title", async () => {
        const csvContent = 
            `Instructions: Date format must be YYYY-MM-DD. Priority must be HIGH/MEDIUM/LOW. Completed must be true or false.

            Title,Date,Priority,Completed
            ,2026-08-03, HIGH, false`;  
        const file = new File([csvContent], "testTasks.csv", {
            type: "text/csv"
        });
        await expect(uploadCSV(file)).rejects.toThrow("Line 4: Title is required.");
    });
    it("throws an error when the date is missing", async () => {
        const csvContent = 
            `Instructions: Date format must be YYYY-MM-DD. Priority must be HIGH/MEDIUM/LOW. Completed must be true or false.

            Title,Date,Priority,Completed
            Test title,, HIGH, false`; 
        const file = new File([csvContent], "testTasks.csv", {
            type: "test/csv"
        });
        await expect(uploadCSV(file)).rejects.toThrow("Line 4: Date is missing or invalid.")
    });
    it("if the date is in a text string, it will still go through", async () => {
        const csvContent = 
            `Instructions: Date format must be YYYY-MM-DD. Priority must be HIGH/MEDIUM/LOW. Completed must be true or false.

            Title,Date,Priority,Completed
            Test title,8/03/2026, HIGH, false`; 
        const file = new File([csvContent], "testTasks.csv", {
            type: "test/csv"
        });
        const tasks = await uploadCSV(file);
        expect(tasks).toEqual([
            {
                id: expect.any(Number),
                title: "Test title",
                date: new Date("2026, 08, 03"),
                priority: "HIGH",
                completed: false
            }
        ]);
    });
    it("throws an error if the priority is invalid", async () => {
        const csvContent = 
            `Instructions: Date format must be YYYY-MM-DD. Priority must be HIGH/MEDIUM/LOW. Completed must be true or false.

            Title,Date,Priority,Completed
            Test title,2026-08-03, URGENT, false`; 
        const file = new File([csvContent], "testTasks.csv", {
            type: "test/csv"
        });
        await expect(uploadCSV(file)).rejects.toThrow("Line 4: Priority must be HIGH, MEDIUM, or LOW.");
    }); 
    it("keeps going if the priority is still one of the options but not case-sensitive", async () => {
        const csvContent = 
            `Instructions: Date format must be YYYY-MM-DD. Priority must be HIGH/MEDIUM/LOW. Completed must be true or false.

            Title,Date,Priority,Completed
            Test title,2026-08-03, high, false
            Test title 2, 2026-08-04, LoW, true`; 
        const file = new File([csvContent], "testTasks.csv", {
            type: "test/csv"
        }); 
        const tasks = await uploadCSV(file);
        expect(tasks).toEqual([
            {
                id: expect.any(Number),
                title: "Test title",
                date: new Date("2026-08-03"),
                priority: "HIGH",
                completed: false
            }, 
            {
                id: expect.any(Number),
                title: "Test title 2",
                date: new Date("2026-08-04"),
                priority: "LOW",
                completed: true
            }
        ]);
    });
    it("returns an error if compleded is invalid", async () => {
        const csvContent = 
            `Instructions: Date format must be YYYY-MM-DD. Priority must be HIGH/MEDIUM/LOW. Completed must be true or false.

            Title,Date,Priority,Completed
            Test title,8/03/2026, HIGH, nope`;  
        const file = new File([csvContent], "testTasks.csv", {
            type: "test/csv"
        }); 
        await expect(uploadCSV(file)).rejects.toThrow("Line 4: Completed must be true or false.")
    }); 
    it("ignores empty lines", async () => {
        const csvContent = 
            `Instructions: Date format must be YYYY-MM-DD. Priority must be HIGH/MEDIUM/LOW. Completed must be true or false.

            Title,Date,Priority,Completed
            Testing Task, 2026-08-03, HIGH, false

            Testing Task 2, 2026-08-04, MEDIUM, true


            Testing Task 3, 2026-08-05, LOW, false`;  
        const file = new File([csvContent], "testTasks.csv", {
            type: "text/csv"
        });
        const tasks = await uploadCSV(file);
        expect(tasks).toEqual([
            {
                id: expect.any(Number),
                title: "Testing Task",
                date: new Date("2026-08-03"),
                priority: "HIGH",
                completed: false
            },
            {
                id: expect.any(Number),
                title: "Testing Task 2",
                date: new Date("2026-08-04"),
                priority: "MEDIUM",
                completed: true
            },
            {
                id: expect.any(Number),
                title: "Testing Task 3",
                date: new Date("2026-08-05"),
                priority: "LOW",
                completed: false
            }
        ]);
    });
    it("returns an empty file if the CSV is completely empty (including instructions)", async () => {
        const csvContent = ``; 
        const file = new File([csvContent], "testTasks.csv", {
            type: "test/csv"
        });
        const tasks = await uploadCSV(file);
        expect(tasks).toEqual([]);
    });
    it("returns an error if there are too many columns", async () => {
        const csvContent = 
            `Instructions: Date format must be YYYY-MM-DD. Priority must be HIGH/MEDIUM/LOW. Completed must be true or false.

            Title,Date,Priority,Completed
            Testing Task, 2026-08-03, HIGH, false, extra added column, extra added column 2`;  
        const file = new File([csvContent], "testTasks.csv", {
            type: "test/csv"
        });
        await expect(uploadCSV(file)).rejects.toThrow("Line 4: Expected exactly four values.")
    }); 
});