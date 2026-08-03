import { render, screen, fireEvent } from "@testing-library/react"; 
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import DeleteCompletedTasks from "./DeleteCompleted"; 
import type { Task } from "../types/Task"; 

describe("DeleteCompletedTasks", () => {
    it("shows the popup", () => {
        render(
            <DeleteCompletedTasks 
                onClose={vi.fn()}
                tasks={[]}
                deleteCompleteTasks={vi.fn()}
            />
        );
        const title = screen.getByRole("heading", { name: /are you sure/i });
        expect(title).toBeInTheDocument;
    });
    it("calls onClose when the close button is clicked", () => {
        const closeBtn = vi.fn();
        render(
            <DeleteCompletedTasks 
                onClose={closeBtn}
                tasks={[]}
                deleteCompleteTasks={vi.fn()}
            />
        );
        fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
        expect(closeBtn).toHaveBeenCalled();
    });
    it("calls deleteCompletedTasks when the continue button is clicked", () => {
        const continueBtn = vi.fn();
        render(
            <DeleteCompletedTasks 
                onClose={vi.fn()}
                tasks={[]}
                deleteCompleteTasks={continueBtn}
            />
        );
        fireEvent.click(screen.getByRole("button", { name: "Delete Completed Tasks" }));
        expect(continueBtn).toHaveBeenCalled();
    });
    it("displays TASK for one completed task", () => {
        render(
            <DeleteCompletedTasks 
                onClose={vi.fn()}
                tasks={[
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
                ]}
                deleteCompleteTasks={vi.fn()}
            />
        ); 
        const title = screen.getByRole("heading", { name: /are you sure/i });
        expect(title).toHaveTextContent("Are you sure you want to permanently delete 1 completed task?");
    });
    it("displays TASKS for more than one completed task", () => {
        render(
            <DeleteCompletedTasks 
                onClose={vi.fn()}
                tasks={[
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
                    {
                        id: 3,
                        title: "Task three",
                        completed: true,
                        date: new Date(),
                        priority: "MEDIUM"
                    },
                ]}
                deleteCompleteTasks={vi.fn()}
            />
        );
        const title = screen.getByRole("heading", { name: /are you sure/i });
        expect(title).toHaveTextContent("Are you sure you want to permanently delete 2 completed tasks?");
    });
});