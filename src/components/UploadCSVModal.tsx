import "../styles/UploadCSVModal.css";
import { useState } from "react";
interface uploadCSVModalProps {
    onClose: () => void;
    handleCSVUpload: (file: File) => void;
}  

function UploadCSVModal({ onClose, handleCSVUpload }: uploadCSVModalProps) {
    const [csvName, setCSVName] = useState("");
    const [csvFile, setCSVFile] = useState<File | null>(null);

    return (
        <div className="modalOverlay">
            <div className="modal">
                <h2>Upload CSV</h2>
                <div className="getTemplateArea">
                    <a href="/CSVTemplate.csv" download>&#10515; Get Template</a>
                </div>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    if (csvFile) {
                        handleCSVUpload(csvFile);
                    }
                    onClose();
                }}>
                    <input
                        id="csvFile"
                        type="file"
                        accept=".csv"
                        style={{ display: "none" }}
                        onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            setCSVFile(file);
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
