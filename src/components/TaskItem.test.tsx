import { render, screen, fireEvent } from "@testing-library/react"; //render puts component into fake browser, screen lets you search for things the user can see
import { describe, it, expect, vi } from "vitest"; //vi lets you create mock functions
import "@testing-library/jest-dom/vitest";
import TaskItem from "./TaskItem"; 
import type { Task } from "../types/Task";

describe("TaskItem", () => {
    it("displays the task title", () => {
        const task: Task = {
            id: 1,
            title: "Finish TypeScript Todo App",
            completed: false,
            priority: "HIGH",
            date: new Date(2026, 7, 12)
        };
        render(
            <TaskItem 
                task={task}
                onToggle={vi.fn()} //creates a mock function that doesn't do anything except remember how it was called (won't update the state or anything in the App.tsx)
                currentDate={new Date(2026, 7, 12)}
            />
        );
        const title = screen.getByText("Finish TypeScript Todo App"); //searches for what the user would actually see
        expect(title).toBeInTheDocument();
    });
    it("changes to UNDO after a COMPLETE button is pressed", () => {
        const task: Task = {
            id: 1,
            title: "Finish TypeScript Todo App",
            completed: false,
            priority: "HIGH",
            date: new Date(2026, 7, 12)
        };
        const onToggle = vi.fn(); //creating it separately so we can inpect it after
        render(
            <TaskItem 
                task={task}
                onToggle={onToggle} 
                currentDate={new Date(2026, 7, 12)}
            />
        );
        const button = screen.getByRole("button", { name: "✓ Complete" }); 
        /*
        screen represents the entire rendered output of the component
        .getByRole is a query method that searches through rendered output loooking for an element with a specific ARIA role
        "button" - the first argument, tells which ARIA role to search for 
        //{name: Complete} name refers to the accessible name of the element/the visible text content the button displays,
            so it will search specically for a button first that has that name/object properties
        
        */
        fireEvent.click(button);
        expect(onToggle).toHaveBeenCalledWith(1); //because the id of the task is 1
        expect(onToggle).toHaveBeenCalledTimes(1);
    });
    it("changes to COMPLETE after a UNDO button is pressed", () => {
        const task: Task = {
            id: 1,
            title: "Finish TypeScript Todo App",
            completed: true,
            priority: "HIGH",
            date: new Date(2026, 7, 12)
        };
        const onToggle = vi.fn(); 
        render(
            <TaskItem 
                task={task}
                onToggle={onToggle} 
                currentDate={new Date(2026, 7, 12)}
            />
        );
        const button = screen.getByRole("button", { name: "↩ Undo" }); 
        fireEvent.click(button);
        expect(onToggle).toHaveBeenCalledWith(1);
        expect(onToggle).toHaveBeenCalledTimes(1);
    });
    it("has priority HIGH if the priority inside the task is HIGH", () => {
        const task: Task = {
            id: 1,
            title: "Finish TypeScript Todo App",
            completed: false,
            priority: "HIGH",
            date: new Date(2026, 7, 12)
        };
        render(
            <TaskItem  
                task={task}
                onToggle={vi.fn()}
                currentDate={new Date(2026, 7, 12)}
            /> 
        );
        const priorityText = screen.getByText("HIGH", { selector: "span.priority" }); //searching any span with className priority
        expect(priorityText).toBeInTheDocument();
    });
})