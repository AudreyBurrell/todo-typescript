import "../styles/AddTaskModal.css";

interface addTaskProps {
    onClose: () => void; //onClose is the name of the prop, and is a function and returns nothing
}

function AddTaskModal({ onClose } : addTaskProps) {
    return (
        <>
            <div className="modalOverlay">
                <div className="modal">
                    <h2>Add Task</h2>
                    <button onClick={onClose}>Cancel</button> {/*Calling the onClose function from the addTasksProps, which will call closeAddTaskModal() in the App.tsx */}
                </div>
            </div>
        </>
    )
}

export default AddTaskModal;