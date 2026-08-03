import { render, screen, fireEvent, waitFor } from "@testing-library/react"; 
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import UploadCSVModal from "./UploadCSVModal"; 
import { uploadCSV } from "../utils/parseCSV";
import type { Task } from "../types/Task"; 

describe("UploadCSVModal", () => {
    vi.mock("../utils/parseCSV", () => ({
        uploadCSV: vi.fn()
    }));

    it("displays the modal title", () => {
        render(
            <UploadCSVModal 
                onClose={vi.fn()}
                handleCSVUpload={vi.fn()}
            />
        );
        const title = screen.getByRole("heading", { name: "Upload CSV" });
        expect(title).toBeInTheDocument();
        expect(title).toBeVisible();
    }); 
    it ("calls onClose when the cancel button is clicked", () => {
        const onCloseFunction = vi.fn();
        render(
            <UploadCSVModal
                onClose={onCloseFunction}
                handleCSVUpload={vi.fn()}
            />
        ); 
        const closeBtn = screen.getByRole("button", { name: "Cancel" });
        fireEvent.click(closeBtn);
        expect(onCloseFunction).toHaveBeenCalled();
    }); 
    it("does not call uploadCSV when no file is selected", () => {
        const mockHandleCSVUpload = vi.fn();
        render (
            <UploadCSVModal
                onClose={vi.fn()}
                handleCSVUpload = {mockHandleCSVUpload}
            /> 
        ); 
        fireEvent.click(screen.getByRole("button", { name: /add csv/i } ));
        expect(mockHandleCSVUpload).not.toHaveBeenCalled();
    })
    it("allows users to upload a csv", async () => {
        const mockHandleCSVUpload = vi.fn();
        const importedTasks: Task[] = [
            {
                id: 1,
                title: "Test task",
                date: new Date("2026-08-03"),
                priority: "HIGH",
                completed: false
            }
        ];
        vi.mocked(uploadCSV).mockResolvedValue(importedTasks);
        /*
        vi.mocked(uploadCSV) tells TypeScript to treat uploadCSV as a mocked function
        .mockResolvedValue controls what its asynchronous result iwll be
        importedTasks is the value the mocked promise resolves with (represents the pretend result of parsing the CSV)
        */
        render (
            <UploadCSVModal
                onClose={vi.fn()}
                handleCSVUpload = {mockHandleCSVUpload}
            /> 
        );
        const file = new File(["CSV content"], "testTasks.csv", {
            type: "text/csv"
        });
        const fileInput = screen.getByLabelText(/choose file/i);
        fireEvent.change(fileInput, { target: { files: [file] } });
        fireEvent.click(screen.getByRole("button", { name: /add csv/i } )); 
        await waitFor(() => {
            expect(mockHandleCSVUpload).toHaveBeenCalledWith(file);
        });
    });
    it("shows the selected file name", () => {
        render (
            <UploadCSVModal
                onClose={vi.fn()}
                handleCSVUpload = {vi.fn()}
            /> 
        );  
        const file = new File(["CSV Content"], "testTasks.csv", {
            type: "test/csv"
        });
        const fileInput = screen.getByLabelText(/choose file/i);
        fireEvent.change(fileInput, { target: { files: [file] } });
        expect(screen.getByText("testTasks.csv")).toBeInTheDocument;
    });
    it("downloads the right CSV when the button is pressed", () => {
        render (
            <UploadCSVModal
                onClose={vi.fn()}
                handleCSVUpload = {vi.fn()}
            /> 
        );  
        const templateLink = screen.getByRole("link", {
            name: /get template/i
        })
        expect(templateLink).toHaveAttribute("href", "/CSVTemplate.csv");
        expect(templateLink).toHaveAttribute("download");
    });
});