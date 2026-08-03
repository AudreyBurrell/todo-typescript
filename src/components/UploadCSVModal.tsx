import "../styles/UploadCSVModal.css";
import { useState } from "react";
import type { Task } from "../types/Task"; 

interface uploadCSVModalProps {
    onClose: () => void;
}  

function UploadCSVModal({ onClose }: uploadCSVModalProps) {
    const [csvName, setCSVName] = useState("");

    return (
        <div className="modalOverlay">
            <div className="modal">
                <h2>Upload CSV</h2>
                <div className="getTemplateArea">
                    <a href="#">&#10515; Get Template</a>
                </div>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    // onAddTask({
                    //     id: Date.now(),
                    //     title: title,
                    //     completed: false,
                    //     date: parseLocalDate(date),
                    //     priority: priority
                    // });
                }}>
                    <input
                        id="csvFile"
                        type="file"
                        accept=".csv"
                        style={{ display: "none" }}
                        onChange={(event) => {
                            const file = event.target.files?.[0];
                            setCSVName(file ? file.name : "");
                        }}
                    />

                    <label htmlFor="csvFile" className="chooseFileButton">
                        Choose File
                    </label>

                    <p className="csvName">
                        {csvName || "No file selected"}
                    </p>
                    <div className="modalButtons">
                        <button type="submit">
                            Add CSV
                        </button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>  
                </form>


                
            </div>
        </div>
        
    )
} 

export default UploadCSVModal;
