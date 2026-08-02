import { render, screen, fireEvent } from "@testing-library/react"; 
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import AddTaskModal from "./AddTaskModal"; 

describe("AddTaskModal", () => {
    it("displays the task modal title", () => {
        render(
            <AddTaskModal 
                onClose={vi.fn()}
                onAddTask={vi.fn()}
            />
        );
        const title = screen.getByRole("heading", { name: "Add Task" });
        expect(title).toBeInTheDocument();
        expect(title).toBeVisible();
    });
    it("starts out the priority options at MEDIUM", () => {
        render(
            <AddTaskModal 
                onClose={vi.fn()}
                onAddTask={vi.fn()}
            />
        ); 
        const priorityArea = screen.getByLabelText("Priority:");
        expect(priorityArea).toHaveValue("MEDIUM");
    });
    it("the dropdown has all priority values", () => {
        render(
            <AddTaskModal 
                onClose={vi.fn()}
                onAddTask={vi.fn()}
            />
        ); 
        const priorityDropdown = screen.getByRole("combobox");
        expect(priorityDropdown).toHaveTextContent("High");
        expect(priorityDropdown).toHaveTextContent("Medium");
        expect(priorityDropdown).toHaveTextContent("Low");
    });
    it("displays the task priority", () => {
        render(
            <AddTaskModal  
                onClose={vi.fn()}
                onAddTask={vi.fn()}
            />
        );
        const priority = screen.getByLabelText("Priority:");
        expect(priority).toBeInTheDocument();
    });
    it("allows the user to enter a task title", () => {
        render(
            <AddTaskModal  
                onClose={vi.fn()}
                onAddTask={vi.fn()}
            />
        );
        const input = screen.getByPlaceholderText("Enter task...");
        fireEvent.change(input, { target: { value: "Finish HW" } });
        expect(input).toHaveValue("Finish HW");
    });
    it("allows the user to enter a date", () => {
        render(
            <AddTaskModal  
                onClose={vi.fn()}
                onAddTask={vi.fn()}
            />
        );
        const input = screen.getByLabelText("Date:");
        fireEvent.change(input, { target: { value: "2026-08-02" } });
        expect(input).toHaveValue("2026-08-02");
    });
    it("allows users to set a priority", () => {
        render(
            <AddTaskModal  
                onClose={vi.fn()}
                onAddTask={vi.fn()}
            />
        );
        const input = screen.getByLabelText("Priority:");
        fireEvent.change(input, { target: { value: "HIGH" } });
        expect(input).toHaveValue("HIGH");
    });
    it("calls the onAddTask when submitting", () => {
        const mockAddTask = vi.fn();
        render(
            <AddTaskModal  
                onClose={vi.fn()}
                onAddTask={mockAddTask}
            />
        ); 
        const taskInput = screen.getByLabelText("Task:");
        fireEvent.change(taskInput, { target: { value: "Finish HW" } });
        const dateInput = screen.getByLabelText("Date:");
        fireEvent.change(dateInput, { target: { value: "2026-08-02" } });
        const priorityInput = screen.getByLabelText("Priority:");
        fireEvent.change(priorityInput, { target: { value: "HIGH" } });
        fireEvent.click(screen.getByRole("button", { name: "Add Task" }));
        expect(mockAddTask).toHaveBeenCalled();
    });
    it("Calls onClose when Cancel is clicked", () => {
        const mockOnClose = vi.fn();
        render(
            <AddTaskModal  
                onClose={mockOnClose}
                onAddTask={vi.fn()}
            />
        ); 
        fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
        expect(mockOnClose).toHaveBeenCalled();
    });
});